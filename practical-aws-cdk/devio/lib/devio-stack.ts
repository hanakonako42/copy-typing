import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class DevioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const systemName = this.node.tryGetContext('systemName');
    const envType = this.node.tryGetContext('envType');

    new ec2.CfnVPC(this, 'Vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: [ { key: 'Name', value: `${systemName}-${envType}-vpc` } ]
    });
  }
}
