import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';
import { User } from '../../users/entities/user.entity';
import { SubscriptionPlan } from './subscription-plan.entity';
import { SubscriptionStatus } from '../../../common/types';

@Entity('subscriptions')
export class Subscription extends TenantBaseEntity {
  @Column()
  customerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column()
  planId: string;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'planId' })
  plan: SubscriptionPlan;

  @Column({ default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastDeliveryDate: Date;

  @Column({ type: 'timestamp' })
  nextDeliveryDate: Date;
}
