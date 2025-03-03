import { Construct } from 'constructs';
import { CfnSubnet, CfnVPC } from 'aws-cdk-lib/aws-ec2';
import { Resource } from '../abstract/resource';

interface ResouceInfo {
    readonly id: string;
    readonly cidrBlock: string;
    readonly availabilityZone: string;
    readonly resouceName: string;
    readonly assign: (subnet: CfnSubnet) => void;
}

export class Subnet extends Resource {
    public public1a: CfnSubnet;
    public public1c: CfnSubnet;
    public app1a: CfnSubnet;
    public app1c: CfnSubnet;
    public db1a: CfnSubnet;
    public db1c: CfnSubnet;

    private readonly vpc: CfnVPC;
    private readonly resourceInfo: ResouceInfo[] = [
        {
            id: 'SubnetPublic1a',
            cidrBlock: '10.0.11.0/24',
            availabilityZone: 'ap-northeast-1a',
            resouceName: 'subnet-public-1a',
            assign: subnet => this.public1a = subnet
        },
        {
            id: 'SubnetPublic1c',
            cidrBlock: '10.0.12.0/24',
            availabilityZone: 'ap-northeast-1c',
            resouceName: 'subnet-public-1c',
            assign: subnet => this.public1c = subnet
        },        
        {
            id: 'SubnetApp1a',
            cidrBlock: '10.0.21.0/24',
            availabilityZone: 'ap-northeast-1a',
            resouceName: 'subnet-app-1a',
            assign: subnet => this.app1a = subnet
        },
        {
            id: 'SubnetApp1c',
            cidrBlock: '10.0.22.0/24',
            availabilityZone: 'ap-northeast-1c',
            resouceName: 'subnet-app-1c',
            assign: subnet => this.app1c = subnet
        },
        {
            id: 'SubnetDb1a',
            cidrBlock: '10.0.31.0/24',
            availabilityZone: 'ap-northeast-1a',
            resouceName: 'subnet-db-1a',
            assign: subnet => this.db1a = subnet
        },
        {
            id: 'SubnetDb1c',
            cidrBlock: '10.0.32.0/24',
            availabilityZone: 'ap-northeast-1c',
            resouceName: 'subnet-db-1c',
            assign: subnet => this.db1c = subnet
        }
    ];

    constructor(vpc: CfnVPC) {
        super();
        this.vpc = vpc;
    };

    createResources(scope: Construct) {
        for (const resourceInfo of this.resourceInfo) {
            const subnet = this.createSubnet(scope, resourceInfo);
            resourceInfo.assign(subnet);
        }
    }

    private createSubnet(scope: Construct, resouceInfo: ResouceInfo): CfnSubnet {
        const subnet = new CfnSubnet(scope, resouceInfo.id, {
            cidrBlock: resouceInfo.cidrBlock,
            vpcId: this.vpc.ref,
            availabilityZone: resouceInfo.availabilityZone,
            tags: [{ key: 'Name', value: this.createResourceName(scope, resouceInfo.resouceName) }]
        });
        
        return subnet;
    }
}
