import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class AssignmentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.CfnVPC(this, 'reservationVpc', {
      cidrBlock: '10.0.0.0/21',
      tags: [{ key: 'Name', value: 'reservation-vpc'}]
    });

    const webSubnet = new ec2.CfnSubnet(this, 'WebSubnet', {
      vpcId: vpc.ref,
      cidrBlock: '10.0.0.0/24',
      tags: [{ key: 'Name', value: 'web-subnet-01' }]
    });

    const apiSubnet = new ec2.CfnSubnet(this, 'ApiSubnet', {
      vpcId: vpc.ref, 
      cidrBlock: '10.0.1.0/24',
      tags: [ { key: 'Name', value: 'api-subnet-01' } ]
    });

    // const webRouteTable = new ec2.CfnRouteTable(this, 'WebRouteTable', {
    //   vpcId: vpc.ref,

    // })
  }
}
