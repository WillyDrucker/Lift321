// ==========================================================================
// EXERCISE CARD COMPONENT
//
// Displays current exercise info with equipment icon.
// Allows selecting alternate exercises via bottom sheet.
//
// Dependencies: theme tokens, BottomSheet
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useCallback, useMemo, useImperativeHandle, forwardRef, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {BarbellIcon, DumbbellIcon, EZBarIcon, FixedBarbellIcon, FixedBarbellEZIcon, PinMachineIcon, CableMachineIcon, PlateLoadedIcon, SmithMachineIcon, ResistanceBandIcon, BodyweightIcon} from '@/components/icons';
import {BottomSheet} from '@/components';
import exercisesData from '@/data/exercises.json';

// ============================================================================
// SHAKEABLE VIEW - Isolated component to avoid hook order issues
// ============================================================================

type ShakeableViewProps = {
  children: React.ReactNode;
};

type ShakeableViewRef = {
  shake: () => void;
};

const ShakeableView = forwardRef<ShakeableViewRef, ShakeableViewProps>(
  ({children}, ref) => {
    const shakeOffset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{translateX: shakeOffset.value}],
    }));

    useImperativeHandle(ref, () => ({
      shake: () => {
        shakeOffset.value = withSequence(
          withTiming(-8, {duration: 50}),
          withTiming(8, {duration: 50}),
          withTiming(-6, {duration: 50}),
          withTiming(6, {duration: 50}),
          withTiming(0, {duration: 50}),
        );
      },
    }));

    return (
      <Animated.View style={[{width: '100%'}, animatedStyle]}>
        {children}
      </Animated.View>
    );
  }
);

// ============================================================================
// CONSTANTS
// ============================================================================

// Color code mapping for program_color_code
const COLOR_CODE_MAP: Record<string, string> = {
  cc1: theme.colors.actionSuccess, // Green
  cc2: theme.colors.sessionExpress, // Olive green
  cc3: theme.colors.sessionMaintenance, // Yellow
  cc4: theme.colors.actionWarning, // Orange
  red: theme.colors.actionDanger, // Red - note/non-selectable items
};

// Exercise type from JSON
type Exercise = {
  day: string;
  body_part: string;
  push_pull: string;
  muscle_group: string;
  sets: string;
  exercise_name: string;
  position: string;
  equipment_use: string;
  equipment_setup: string;
  equipment_weight: string;
  program_order: string;
  program_color_code: string;
  program1_order: string;
  program1_color_code: string;
};

// ============================================================================
// TYPES
// ============================================================================

type SessionType = 'Standard' | 'Express' | 'Maintenance';

type ExerciseCardProps = {
  exerciseName?: string;
  currentSet?: number;
  totalSets?: number;
  bodyPart?: string;
  muscleGroup?: string;
  day?: string;
  sessionType?: SessionType;
  onExerciseChange?: (originalName: string, newName: string, color: string) => void;
  hasLoggedSets?: boolean; // True if any sets logged for this exercise (locks exercise selection)
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseName = 'EXERCISE',
  currentSet = 1,
  totalSets = 1,
  bodyPart = 'Chest',
  muscleGroup = 'Major1',
  day = 'Monday',
  sessionType = 'Standard',
  onExerciseChange,
  hasLoggedSets = false,
}) => {
  // Get session color based on session type
  const getSessionColor = () => {
    switch (sessionType) {
      case 'Standard': return theme.colors.sessionStandard;
      case 'Express': return theme.colors.sessionExpress;
      case 'Maintenance': return theme.colors.sessionMaintenance;
      default: return theme.colors.sessionStandard;
    }
  };
  const sessionColor = getSessionColor();
  // Get safe area insets to calculate correct bottom sheet top offset
  const insets = useSafeAreaInsets();

  // Calculate topOffset to position sheet below the plan image
  // Plan image: top at insets.top + 4, height 40dp, so bottom at insets.top + 44
  const bottomSheetTopOffset = insets.top + 44;

  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(exerciseName);
  const [selectedColorCode, setSelectedColorCode] = useState<string>('cc1');
  const [selectedEquipment, setSelectedEquipment] = useState({
    equipmentUse: '',
    equipmentWeight: '',
    equipmentSetup: '',
  });

  // Ref for shake animation
  const shakeRef = useRef<ShakeableViewRef>(null);

  // Filter and sort exercises for the current body part and muscle group
  const alternateExercises = useMemo(() => {
    const filtered = (exercisesData as Exercise[]).filter((ex) => {
      const matchesBodyPart = ex.body_part === bodyPart;
      const matchesMuscleGroup = ex.muscle_group === muscleGroup;
      const matchesDay = bodyPart === 'Legs' ? ex.day === day : true;
      return matchesBodyPart && matchesMuscleGroup && matchesDay;
    });

    const sorted = filtered.sort((a, b) => {
      const orderA = parseInt(a.program_order.replace('order', ''), 10);
      const orderB = parseInt(b.program_order.replace('order', ''), 10);
      return orderA - orderB;
    });

    return sorted.map((ex, index) => ({
      id: `${ex.exercise_name}-${ex.equipment_setup}-${index}`,
      name: ex.exercise_name,
      position: ex.position,
      equipmentUse: ex.equipment_use,
      equipmentSetup: ex.equipment_setup,
      equipmentWeight: ex.equipment_weight,
      colorCode: ex.program_color_code,
      order: ex.program_order,
      isCurrentExercise: ex.exercise_name.toLowerCase() === selectedExercise.toLowerCase(),
    }));
  }, [day, bodyPart, muscleGroup, selectedExercise]);

  // Initialize equipment info from the selected exercise
  React.useEffect(() => {
    const matchingExercise = alternateExercises.find(
      ex => ex.name.toLowerCase() === selectedExercise.toLowerCase()
    );
    if (matchingExercise && !selectedEquipment.equipmentWeight) {
      setSelectedEquipment({
        equipmentUse: matchingExercise.equipmentUse,
        equipmentWeight: matchingExercise.equipmentWeight,
        equipmentSetup: matchingExercise.equipmentSetup,
      });
    }
  }, [alternateExercises, selectedExercise, selectedEquipment.equipmentWeight]);

  // Get the current equipment icon
  const getEquipmentIcon = useCallback(() => {
    const equipmentLower = selectedEquipment.equipmentUse.toLowerCase();
    const weightLower = selectedEquipment.equipmentWeight.toLowerCase();
    const setupLower = selectedEquipment.equipmentSetup.toLowerCase();
    const exerciseNameLower = selectedExercise.toLowerCase();
    const iconColor = COLOR_CODE_MAP[selectedColorCode] || theme.colors.actionSuccess;

    const isFreeWeight = weightLower === 'free weight';
    const isPinLoaded = weightLower === 'pin-loaded';
    const isPlateLoaded = weightLower === 'plate-loaded';
    const isLinearWeight = weightLower === 'linear weight';
    const isResistance = weightLower === 'resistance';
    const isBodyweight = weightLower === 'bodyweight';

    if (isFreeWeight && equipmentLower === 'barbell') {
      return <BarbellIcon width={48} height={24} color={iconColor} />;
    }
    if (isFreeWeight && (equipmentLower === 'dumbbell' || equipmentLower === 'dumbbells')) {
      return <DumbbellIcon width={48} height={24} color={iconColor} />;
    }
    if (isFreeWeight && equipmentLower === 'ez bar') {
      return <EZBarIcon width={48} height={24} color={iconColor} />;
    }
    if (isFreeWeight && equipmentLower === 'fixed barbell' && exerciseNameLower === 'bicep curl') {
      return <FixedBarbellEZIcon width={48} height={24} color={iconColor} />;
    }
    if (isFreeWeight && equipmentLower === 'fixed barbell') {
      return <FixedBarbellIcon width={48} height={24} color={iconColor} />;
    }
    if (isPinLoaded && setupLower === 'cable machine') {
      return <CableMachineIcon width={48} height={24} color={iconColor} />;
    }
    if (isPinLoaded) {
      return <PinMachineIcon width={48} height={24} color={iconColor} />;
    }
    if (isPlateLoaded) {
      return <PlateLoadedIcon width={48} height={24} color={iconColor} />;
    }
    if (isLinearWeight && setupLower.includes('smith machine')) {
      return <SmithMachineIcon width={48} height={24} color={iconColor} />;
    }
    if (isResistance) {
      return <ResistanceBandIcon width={48} height={24} color={iconColor} />;
    }
    if (isBodyweight) {
      return <BodyweightIcon width={48} height={24} color={iconColor} />;
    }
    return null;
  }, [selectedEquipment, selectedExercise, selectedColorCode]);

  const handleExerciseNamePress = useCallback(() => {
    setExerciseSelectorVisible(true);
  }, []);

  const handleExerciseSelectorClose = useCallback(() => {
    setExerciseSelectorVisible(false);
  }, []);

  const handleExerciseSelect = useCallback((exercise: {
    id: string;
    name: string;
    equipmentUse: string;
    equipmentWeight: string;
    equipmentSetup: string;
    colorCode: string;
    order: string;
    isCurrentExercise: boolean;
  }) => {
    setSelectedExercise(exercise.name);
    setSelectedColorCode(exercise.colorCode);
    setSelectedEquipment({
      equipmentUse: exercise.equipmentUse,
      equipmentWeight: exercise.equipmentWeight,
      equipmentSetup: exercise.equipmentSetup,
    });
    setExerciseSelectorVisible(false);
    // Notify parent of exercise change with color
    const newColor = COLOR_CODE_MAP[exercise.colorCode] || theme.colors.actionSuccess;
    onExerciseChange?.(exerciseName, exercise.name, newColor);
  }, [exerciseName, onExerciseChange]);

  const textColor = COLOR_CODE_MAP[selectedColorCode] || theme.colors.actionSuccess;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Main info box with icon - wrapped in ShakeableView for shake animation */}
          <ShakeableView ref={shakeRef}>
            <TouchableOpacity
              onPress={hasLoggedSets ? () => shakeRef.current?.shake() : handleExerciseNamePress}
              activeOpacity={hasLoggedSets ? 1 : 0.7}
              style={[
                styles.exerciseInfoBox,
                hasLoggedSets ? styles.exerciseInfoBoxLocked : styles.exerciseInfoBoxTappable,
              ]}
            >
              {/* Exercise Name - Centered */}
              <Text style={[styles.exerciseName, {color: textColor}]}>
                {selectedExercise.toUpperCase()}
              </Text>

              {/* Details with Icon */}
              <View style={styles.detailsWithIcon}>
                {/* Equipment Icon - Centered on middle line */}
                <View style={styles.iconAbsolute}>
                  {getEquipmentIcon()}
                </View>

                {/* Equipment Details - Centered */}
                <View style={styles.detailsCentered}>
                  <Text style={[styles.exerciseDetailLine, {color: textColor}]}>
                    {selectedEquipment.equipmentSetup.toUpperCase()}
                  </Text>
                  <Text style={[styles.exerciseDetailLine, {color: textColor}]}>
                    {selectedEquipment.equipmentWeight.toUpperCase()}
                  </Text>
                  <Text style={[styles.exerciseDetailLineLast, {color: textColor}]}>
                    {selectedEquipment.equipmentUse.toUpperCase()}
                  </Text>
              </View>
            </View>
          </TouchableOpacity>
          </ShakeableView>
        </View>
        <View style={styles.setInfoContainer}>
          <Text style={styles.setInfo}>
            <Text style={styles.setInfoLabel}>CURRENT SET </Text>
            <Text style={{color: sessionColor}}>{currentSet}</Text>
            <Text style={styles.setInfoLabel}> OF </Text>
            <Text style={{color: sessionColor}}>{totalSets}</Text>
          </Text>
        </View>
      </View>

      {/* Exercise Selector Bottom Sheet */}
      <BottomSheet
        visible={exerciseSelectorVisible}
        onClose={handleExerciseSelectorClose}
        topOffset={bottomSheetTopOffset}
        maxHeightPercent={95}
      >
        {alternateExercises.map((exercise, index) => {
          const isRedNote = exercise.colorCode === 'red';
          const rowTextColor = COLOR_CODE_MAP[exercise.colorCode] || theme.colors.textPrimary;

          if (isRedNote) {
            return (
              <View
                key={exercise.id}
                style={[
                  styles.exerciseRow,
                  styles.exerciseRowNote,
                  index > 0 && styles.exerciseRowNotFirst,
                  index === alternateExercises.length - 1 && styles.exerciseRowLast,
                ]}
              >
                <Text style={[styles.exerciseRowText, {color: rowTextColor}]}>
                  {exercise.name.toUpperCase()}
                </Text>
              </View>
            );
          }

          const equipmentLower = exercise.equipmentUse.toLowerCase();
          const weightLower = exercise.equipmentWeight?.toLowerCase() || '';
          const setupLower = exercise.equipmentSetup?.toLowerCase() || '';

          const isFreeWeight = weightLower === 'free weight';
          const isPinLoaded = weightLower === 'pin-loaded';
          const isPlateLoaded = weightLower === 'plate-loaded';
          const isLinearWeight = weightLower === 'linear weight';
          const isResistance = weightLower === 'resistance';
          const isBodyweight = weightLower === 'bodyweight';

          const isBarbell = isFreeWeight && equipmentLower === 'barbell';
          const isDumbbell = isFreeWeight && (equipmentLower === 'dumbbell' || equipmentLower === 'dumbbells');
          const isEZBar = isFreeWeight && equipmentLower === 'ez bar';
          const exerciseNameLower = exercise.name.toLowerCase();
          const isFixedBarbellEZ = isFreeWeight && equipmentLower === 'fixed barbell' && exerciseNameLower === 'bicep curl';
          const isFixedBarbell = isFreeWeight && equipmentLower === 'fixed barbell' && !isFixedBarbellEZ;
          const isCableMachine = isPinLoaded && setupLower === 'cable machine';
          const isPinMachine = isPinLoaded && !isCableMachine;
          const isSmithMachine = isLinearWeight && setupLower.includes('smith machine');

          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseRow,
                index > 0 && styles.exerciseRowNotFirst,
                index === alternateExercises.length - 1 && styles.exerciseRowLast,
              ]}
              onPress={() => handleExerciseSelect(exercise)}
              activeOpacity={0.7}
            >
              <Text style={[styles.exerciseRowText, {color: rowTextColor}]}>
                {(() => {
                  const name = exercise.name.toUpperCase();
                  const words = name.split(' ');
                  if (words[0] === 'BANDED' && words.length >= 3) {
                    return `BANDED\n${words.slice(1).join(' ')}`;
                  }
                  return name;
                })()}
              </Text>

              <View style={styles.exerciseRowDetailsWithIcon}>
                <View style={styles.exerciseRowIconAbsolute}>
                  {isBarbell && <BarbellIcon width={48} height={24} color={rowTextColor} />}
                  {isDumbbell && <DumbbellIcon width={48} height={24} color={rowTextColor} />}
                  {isEZBar && <EZBarIcon width={48} height={24} color={rowTextColor} />}
                  {isFixedBarbell && <FixedBarbellIcon width={48} height={24} color={rowTextColor} />}
                  {isFixedBarbellEZ && <FixedBarbellEZIcon width={48} height={24} color={rowTextColor} />}
                  {isCableMachine && <CableMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isPinMachine && <PinMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isPlateLoaded && <PlateLoadedIcon width={48} height={24} color={rowTextColor} />}
                  {isSmithMachine && <SmithMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isResistance && <ResistanceBandIcon width={48} height={24} color={rowTextColor} />}
                  {isBodyweight && <BodyweightIcon width={48} height={24} color={rowTextColor} />}
                </View>

                <View style={styles.exerciseRowDetailsCentered}>
                  <Text style={[styles.exerciseRowDetailLine, {color: rowTextColor}]}>
                    {exercise.equipmentSetup.toUpperCase()}
                  </Text>
                  <Text style={[styles.exerciseRowDetailLine, {color: rowTextColor}]}>
                    {exercise.equipmentWeight.toUpperCase()}
                  </Text>
                  <Text style={[styles.exerciseRowDetailLineLast, {color: rowTextColor}]}>
                    {exercise.position.toUpperCase()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </View>
  );
};


// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    borderWidth: 0,
    padding: 0,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  setInfoContainer: {
    marginTop: 8,
  },
  // === EXERCISE INFO BOX ===
  exerciseInfoBox: {
    backgroundColor: theme.colors.pureBlack,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
  },
  exerciseInfoBoxTappable: {
    // Default black background
  },
  exerciseInfoBoxLocked: {
    // Same black background, shake animation indicates locked state
  },
  exerciseName: {
    fontSize: 32,
    lineHeight: 32,
    includeFontPadding: false,
    color: theme.colors.actionSuccess,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.layout.exerciseSelector.detailMarginBottom,
  },
  detailsWithIcon: {
    position: 'relative',
    width: '100%',
  },
  iconAbsolute: {
    position: 'absolute',
    left: 0,
    top: 18,
    width: 48,
    alignItems: 'center',
  },
  detailsCentered: {
    alignItems: 'center',
  },
  exerciseDetailLine: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: 4,
  },
  exerciseDetailLineLast: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: 0,
  },
  setInfo: {
    fontSize: theme.layout.exerciseCard.setInfoFontSize,
    lineHeight: theme.layout.exerciseCard.setInfoFontSize,
    includeFontPadding: false,
    color: theme.colors.actionSuccess,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setInfoLabel: {
    color: theme.colors.backgroundTertiary,
  },
  // === EXERCISE SELECTOR STYLES ===
  exerciseRow: {
    borderBottomWidth: theme.layout.border.thin,
    borderBottomColor: theme.colors.borderDefault,
    marginTop: 0,
  },
  exerciseRowDetailsWithIcon: {
    position: 'relative',
    width: '100%',
  },
  exerciseRowIconAbsolute: {
    position: 'absolute',
    left: 0,
    top: 18,
    width: 48,
    alignItems: 'center',
  },
  exerciseRowDetailsCentered: {
    alignItems: 'center',
  },
  exerciseRowDetailLine: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: 4,
  },
  exerciseRowDetailLineLast: {
    fontSize: theme.layout.exerciseSelector.detailFontSize,
    lineHeight: theme.layout.exerciseSelector.detailLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: theme.layout.exerciseSelector.rowBottomPadding,
  },
  exerciseRowNotFirst: {
    marginTop: theme.layout.exerciseSelector.rowSpacing,
  },
  exerciseRowLast: {
    borderBottomWidth: 0,
  },
  exerciseRowNote: {
    paddingBottom: theme.layout.exerciseSelector.rowBottomPadding,
  },
  exerciseRowText: {
    fontSize: theme.layout.exerciseSelector.exerciseNameFontSize,
    lineHeight: theme.layout.exerciseSelector.exerciseNameLineHeight,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    includeFontPadding: false,
    marginBottom: theme.layout.exerciseSelector.detailMarginBottom,
  },
});
