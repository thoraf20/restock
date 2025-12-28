export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PAST_DUE = 'past_due',
}

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  CUSTOMER = 'customer',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  PENDING = 'pending',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}

export enum DeliveryStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

export enum DeliveryType {
  REGULAR = 'regular',
  URGENT = 'urgent',
}

export enum SubscriptionPlanInterval {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
  QUARTERLY = 'quarterly',
  BIWEEKLY = 'biweekly',
}

