import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';
import { InternetGateway } from './resource/internetGateway';
import { ElasticIp } from './resource/ElasticIp';
import { NatGateway } from './resource/NatGateway';
import { RouteTable } from './resource/RouteTable';
import { NetworkAcl } from './resource/networkAcl';
import { IamRole } from './resource/iam';
import { SecurityGroup } from './resource/securityGroup';

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

    // create ngws and attach eips to them
    const natGateway = new NatGateway(
      subnet.public1a,
      subnet.public1c,
      elasticIp.ngw1a,
      elasticIp.ngw1c
    );
    natGateway.createResources(this);

    // create rtbs and attach them to vpc
    const routeTable = new RouteTable(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      subnet.app1a,
      subnet.app1c,
      subnet.db1a,
      subnet.db1c,
      internetGateway.igw,
      natGateway.ngw1a,
      natGateway.ngw1c
    );
    routeTable.createResources(this);

    // create network acls and associate them to subnet
    const networkAcl = new NetworkAcl(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      subnet.app1a,
      subnet.app1c,
      subnet.db1a,
      subnet.db1c
    );
    networkAcl.createResources(this)

    // create iam roles
    const iamRole = new IamRole();
    iamRole.createResources(this);

    // create sg and configure igress rules
    const securityGroup = new SecurityGroup(vpc.vpc);
    securityGroup.createResources(this);
  };
}
