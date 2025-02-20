import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Subnet {
    public public1a: ec2.CfnSubnet;
    public public1c: ec2.CfnSubnet;
    public app1a: ec2.CfnSubnet;
    public app1c: ec2.CfnSubnet;
    public db1a: ec2.CfnSubnet;
    public db1c: ec2.CfnSubnet;

    private readonly vpc: ec2.CfnVPC;

    constructor(vpc: ec2.CfnVPC) {
        this.vpc = vpc;
    };

    public createResources(scope: Construct) {
        const systemName = scope.node.tryGetContext('systemName');
        const envType = scope.node.tryGetContext('envType');

        // this.public1a = new ec2.CfnSubnet(scope: 'SubnetPublic1a')
    }
}

