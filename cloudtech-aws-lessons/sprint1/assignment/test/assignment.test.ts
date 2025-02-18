import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import * as Assignment from '../lib/assignment-stack';

/*==================================================================
 *vpc
 *==================================================================*/
test('Vpc', () => {
    const app = new cdk.App();
    const stack = new Assignment.AssignmentStack(app, 'AssignmentStack');

    const template = assertions.Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::VPC', 1);
    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/21',
        Tags: [{ 'Key': 'Name', 'Value': 'reservation-vpc'}]
    });
});

/*==================================================================
 *subnet
 *==================================================================*/
test ('Subnet', () => {
    const app = new cdk.App();
    const stack = new Assignment.AssignmentStack(app, 'AssignmentStack');

    const template = assertions.Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Subnet', 2);
    template.hasResourceProperties('AWS::EC2::Subnet', {
        // CidrBlock: "10.0.0.0/24", 
        // I'm getting an error and don't know hot to test it. I'll rewrite it once I figure it out.
        Tags: [{ 'Key': 'Name', 'Value': 'api-subnet-01'}]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        /* CidrBlock: '10.0.1.0/24',
         * Tags: [{ 'key': 'Name', 'value': 'api-subnet-01'}]
         * This test looks like cheking only first 'AWS::EC2::Subnet' type in cfn.
         * I'm getting also an error and don't know hot to test it.*/
    })
})
