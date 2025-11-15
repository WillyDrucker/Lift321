// ==========================================================================
// BASE SERVICE
//
// Generic base service class providing common CRUD operations.
// Extend this class to create specific services (users, workouts, etc.).
//
// Dependencies: Supabase client, API utilities, API types
// Used by: Specific service implementations
// ==========================================================================

import {supabase} from './supabaseClient';
import {handleSupabaseQuery, createErrorResponse} from './apiUtils';
import type {ApiResult} from '@/types/api.types';
import type {PostgrestFilterBuilder} from '@supabase/postgrest-js';

// === TYPES ===

export type QueryOptions = {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  offset?: number;
};

export type FilterOptions = {
  [key: string]: any;
};

// === BASE SERVICE CLASS ===

/**
 * Base service providing generic CRUD operations for a Supabase table
 *
 * Usage:
 * ```ts
 * class UserService extends BaseService<User> {
 *   constructor() {
 *     super('users');
 *   }
 * }
 * ```
 */
export class BaseService<T extends {id?: string}> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // === READ OPERATIONS ===

  /**
   * Get all records with optional filtering and ordering
   */
  async getAll(options: QueryOptions = {}): Promise<ApiResult<T[]>> {
    const {orderBy = 'created_at', ascending = false, limit, offset} = options;

    let query = supabase.from(this.tableName).select('*');

    // Apply ordering
    query = query.order(orderBy, {ascending});

    // Apply pagination
    if (limit !== undefined) {
      query = query.limit(limit);
    }
    if (offset !== undefined) {
      query = query.range(offset, offset + (limit || 10) - 1);
    }

    return handleSupabaseQuery<T[]>(async () => query);
  }

  /**
   * Get a single record by ID
   */
  async getById(id: string): Promise<ApiResult<T>> {
    const query = supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseQuery<T>(async () => query);
  }

  /**
   * Get records matching a filter
   */
  async getByFilter(filter: FilterOptions, options: QueryOptions = {}): Promise<ApiResult<T[]>> {
    const {orderBy = 'created_at', ascending = false, limit, offset} = options;

    let query = supabase.from(this.tableName).select('*');

    // Apply filters
    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    // Apply ordering
    query = query.order(orderBy, {ascending});

    // Apply pagination
    if (limit !== undefined) {
      query = query.limit(limit);
    }
    if (offset !== undefined) {
      query = query.range(offset, offset + (limit || 10) - 1);
    }

    return handleSupabaseQuery<T[]>(async () => query);
  }

  /**
   * Get a single record matching a filter
   */
  async getSingleByFilter(filter: FilterOptions): Promise<ApiResult<T>> {
    let query = supabase.from(this.tableName).select('*');

    // Apply filters
    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    query = query.single();

    return handleSupabaseQuery<T>(async () => query);
  }

  // === CREATE OPERATIONS ===

  /**
   * Create a new record
   */
  async create(data: Omit<T, 'id'>): Promise<ApiResult<T>> {
    const query = supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    return handleSupabaseQuery<T>(async () => query);
  }

  /**
   * Create multiple records
   */
  async createMany(data: Omit<T, 'id'>[]): Promise<ApiResult<T[]>> {
    const query = supabase
      .from(this.tableName)
      .insert(data)
      .select();

    return handleSupabaseQuery<T[]>(async () => query);
  }

  // === UPDATE OPERATIONS ===

  /**
   * Update a record by ID
   */
  async update(id: string, data: Partial<T>): Promise<ApiResult<T>> {
    const query = supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseQuery<T>(async () => query);
  }

  /**
   * Update records matching a filter
   */
  async updateByFilter(
    filter: FilterOptions,
    data: Partial<T>,
  ): Promise<ApiResult<T[]>> {
    let query = supabase.from(this.tableName).update(data);

    // Apply filters
    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    query = query.select();

    return handleSupabaseQuery<T[]>(async () => query);
  }

  // === DELETE OPERATIONS ===

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<ApiResult<void>> {
    const {error} = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      return createErrorResponse(error.message, error.code, error.details);
    }

    return {
      data: undefined as void,
      error: null,
      status: 'success',
    };
  }

  /**
   * Delete records matching a filter
   */
  async deleteByFilter(filter: FilterOptions): Promise<ApiResult<void>> {
    let query = supabase.from(this.tableName).delete();

    // Apply filters
    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const {error} = await query;

    if (error) {
      return createErrorResponse(error.message, error.code, error.details);
    }

    return {
      data: undefined as void,
      error: null,
      status: 'success',
    };
  }

  // === COUNT OPERATIONS ===

  /**
   * Count total records
   */
  async count(filter?: FilterOptions): Promise<ApiResult<number>> {
    let query = supabase
      .from(this.tableName)
      .select('*', {count: 'exact', head: true});

    // Apply filters if provided
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const {count, error} = await query;

    if (error) {
      return createErrorResponse(error.message, error.code, error.details);
    }

    return {
      data: count || 0,
      error: null,
      status: 'success',
    };
  }
}
