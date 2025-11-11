# USER PROMPTS - Claude-v1.0.5

This file contains all user prompts for the Claude-v1.0.5 branch of the Lift321 project. Each prompt includes the original verbatim text, a technical translation, and a concise summary.

---

## Historical Prompt #1 - 2025-11-10T10:00:00Z
**Session Context:** Early v1.0.2 development - Initial LoginScreen design

**Original Prompt:**
Let's start by adding the #1E1E1E background on the main login page.  This will be the primary background color for
  all pages for now.  Let's remove everything else except that background.  We're going to use two fonts for now.
  We're going to use the Druk font for eye catching text such as the logo and statements, possibly UI pages, and
  Google's Roboto for standard informational text, buttons, selectors etc.  I'd like to see the text "Lift" in white
  using Druk font at 1.25 rem in the upper left corner, with some space at the top for phone notifications.  Whatever
  the common notification size is, let's place it 16px below that in the upper left.  I'd like to see this image
  scaled next to the the "Lift" text to the right, just for a logo text.  [Image #2]  In the middle of the page let's
  use the secondary light gray color for text and in Druk text put the text "Guaranteed" stacked with "Optimial" below
  it in all caps, then "Results" in green text.  Let's try 2rem for the Guaranteed and Optimial and 3rem for the
  "Results" text.  Then, near the bottom of the login page we're going to create two buttons, first in green 50px in
  size with 8px? rounded edges and text in the middle of the button in white in roboto that reads "Create New Account"
  all caps at 1rem.  Then a second button 10px below, also 50px in space with 8px? rounded edges that reads "I Have
  An Account" all in caps with white.  This button should be a medium gray color.  The buttons should be roughly 100px
  from the bottom navigation buttons.

**Translation:**
The user is initiating the LoginScreen implementation by establishing the core visual design system. This prompt defines:
1. Color system foundation: Primary dark background (#1E1E1E) as the app-wide standard
2. Typography hierarchy: Druk font for branding/emphasis (logo, hero statements), Roboto for UI elements (buttons, text inputs)
3. Layout structure: Top-aligned logo with system notification spacing (16px), center hero message, bottom-aligned CTA buttons with bottom navigation clearance (100px)
4. Component specifications: Logo (1.25rem Druk + image), hero text stack ("Guaranteed"/"Optimal" at 2rem, "Results" at 3rem in green), two 50px tall buttons with 8px border radius and proper spacing (10px between)
5. Color semantics: Green for primary action (Create Account), medium gray for secondary action (Login), light gray for hero text
This establishes the design token system and primary screen layout that will cascade through the entire authentication flow.

**Summary:**
Initial LoginScreen design specification establishing dark theme (#1E1E1E), dual typography system (Druk/Roboto), logo placement, hero message stack, and two primary CTAs with defined sizing, spacing, and color hierarchy.

---

## Historical Prompt #2 - 2025-11-10T12:00:00Z
**Session Context:** Mid v1.0.2 development - LoginFormScreen implementation

**Original Prompt:**
 Clicking on "I have an account" should take us to the login member page.  This new page will animate to the right,
  like advancing a page, if that's normal for switching "next" pages.  The login member page should have a back arrow
  at the top left, and a "Support" text using 1rem in the upper right.  The arrow should be 16px from the top and left
  and the "Support" text should be 16px from the top and right.  We're going to create two 50px input fields that are
  separated by 16px of space, one for email, one for password with one of those eye buttons all the way on the right
  of the password field to see password.  We're going to make a new color here for muted green #008000.  We're going
  to create a 2px border around the 50px input fields, and both fields will used the muted green color while
  unselected.  The 50px input fields will also be rounded with 8px edges like the buttons we created on the login
  page.  When tapping into a field to input text that 50px selector will then change from muted green to pure green
  and the android keyboard will pop up for inputing text.  When the focus taps away it will be muted again.  There
  will be a "Forgot Password?" text in muted green centered below the password input selector by 16px, and a
  "Continue" button, all caps in green 16px below the Forgot Password? text.  Below that a line divider with "OR" in
  caps in the middle in white, and a white 50px button with a google "G" logo on the left inside the button and text
  that says "Continue With Google" all caps, and then a blue, same color as facebook button, 16px below that, same
  50px in size, all with rounded 8px edges with a facebook logo to the left and the "Continue with Facebook" all in
  caps.  For now, most of this can be placeholders until we get it all working.

**Translation:**
The user is defining the LoginFormScreen (member login page) with comprehensive interaction and visual specifications:
1. Navigation: Right-slide animation (standard "forward" transition), back arrow (top-left, 16px insets), "Support" link (top-right, 16px insets)
2. New design token: Muted green (#008000) for unfocused interactive elements, expanding the color system
3. Input field specifications: Two 50px tall text inputs (email, password) with 16px vertical spacing, 8px border radius, 2px borders
4. Focus states: Muted green when unfocused, pure green when focused (active input state)
5. Password field: Visibility toggle (eye icon) on right side
6. Additional UI: "Forgot Password?" link (muted green, 16px below password), "Continue" CTA (green, 16px below link)
7. Social authentication: Divider with "OR" text, Google OAuth button (white with G logo), Facebook OAuth button (Facebook blue with FB logo), both 50px tall with 16px spacing
This implements the complete authentication form with proper state management, OAuth integration placeholders, and consistent spacing/sizing from the design system.

**Summary:**
LoginFormScreen specification with right-slide navigation, dual input fields (email/password) with focus states, new muted green token (#008000), forgot password link, and social OAuth placeholders (Google/Facebook) maintaining 50px/8px sizing standards.

---

## Historical Prompt #3 - 2025-11-10T14:00:00Z
**Session Context:** Late v1.0.2 development - Guest access and MainActivity navigation

**Original Prompt:**
I'd like to create a third button below the "I have an account" button that starts at the 100px margin from the
  button, pushing the other two buttons up, separated, like the other two button but 16px of space.  This button will
  follow the exact same flow an design as the other buttons being 50px and rounded.  I'd like the text to read "Login
  as Guest" with the text all caps, the "Guest" in yellow. We've been using this for mainteance, please add this to
  the token variables --text-yellow-maintenance: #ffff00; Maintenance mode, we can rename purpose later if needed.
  The button should have a drop shadow same as the others and the button color should be a lighter gray than the I
  have an account", please choose a color in hex that matches the theme and tell me what this is after you put it in
  the tokens.  Make the text white.  When clicking on this page, it should open the main activity page and from there
  we'll customize further.  For now, just put the "Lift" text and logo, with shadows, same size, everything in the
  upper left hand corner of the main activity page, 100px from the top.  Make the main activity page with our standard
  gray background.

**Translation:**
The user is adding a third authentication path (guest access) and introducing MainActivity navigation:
1. Button layout adjustment: Insert third button maintaining 100px bottom margin (pushing existing buttons up), 16px spacing between all buttons
2. Guest button specs: 50px tall, 8px border radius (consistent with system), lighter gray than "I Have An Account" button (implementation to choose appropriate hex)
3. New design token: --text-yellow-maintenance (#FFFF00) for maintenance/warning states, applied to "Guest" word highlight
4. Text styling: All caps "LOGIN AS GUEST" with yellow highlight on "GUEST", white text otherwise
5. Navigation target: MainActivity screen (app's primary post-auth view)
6. MainActivity placeholder: Logo/text in upper-left (100px from top, matching LoginScreen positioning), dark gray background (theme standard)
7. Design system note: Drop shadow consistent with other buttons
This introduces the tertiary authentication path (guest mode for maintenance/development) and establishes the initial MainActivity screen structure that will become the app's primary navigation hub.

**Summary:**
Added third "Login as Guest" button with yellow maintenance token (#FFFF00) highlighting "Guest", introduces MainActivity screen with placeholder logo (100px from top), establishes guest authentication path for development/maintenance access.

---
