import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { User } from '../../users/entities/user.entity';
import { DeliveryStatus, DeliveryType } from '../../../common/types';

@Entity('deliveries')
export class Delivery extends TenantBaseEntity {
  @Column({ nullable: true })
  subscriptionId: string;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

  @Column()
  customerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column({ default: DeliveryStatus.PENDING })
  status: DeliveryStatus;

  @Column({ default: DeliveryType.REGULAR })
  type: DeliveryType;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;
}
