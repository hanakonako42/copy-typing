import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Vpc {
    public vpc: ec2.CfnVPC;

    constructor() { };

    public createResources(scope: Construct) {
        const systemName = scope.node.tryGetContext('systemName');
        const envType = scope.node.tryGetContext('envType');

        this.vpc = new ec2.CfnVPC(scope, 'Vpc', {
            cidrBlock: '10.0.0.0/16',
            tags: [{ key: 'Name', value: `${systemName}-${envType}-vpc`}]
        });
    }   
}
