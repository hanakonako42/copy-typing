import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';

export class DevioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create vpc
    const vpc = new Vpc();
    vpc.createResources(this);

    // create subnets    
    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);
  }
}
