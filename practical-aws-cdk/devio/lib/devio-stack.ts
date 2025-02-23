import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';
import { InternetGateway } from './resource/internetGateway';
import { ElasticIp } from './resource/ElasticIp';
import { NatGateway } from './resource/NatGateway';

export class DevioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create vpc
    const vpc = new Vpc();
    vpc.createResources(this);

    // create subnets    
    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);

    // create igw and attach it to vpc
    const internetGateway = new InternetGateway(vpc.vpc);
    internetGateway.createResources(this);

    // get eips
    const elasticIp = new ElasticIp();
    elasticIp.createResources(this);

    // create ngws
    const natGateway = new NatGateway(
      subnet.public1a,
      subnet.public1c,
      elasticIp.ngw1a,
      elasticIp.ngw1c
    );
    natGateway.createResources(this);
  }
}
