import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';
import { SubscriptionPlanInterval } from '../../../common/types';

@Entity('subscription_plans')
export class SubscriptionPlan extends TenantBaseEntity {
  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  interval: SubscriptionPlanInterval;

  @Column({ default: true })
  isActive: boolean;
}
