import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import * as Assignment from '../lib/assignment-stack';

test('Vpcの個数が1つであること', () => {
    const app = new cdk.App();
    const stack = new Assignment.AssignmentStack(app, 'AssignmentStack');

    const template = assertions.Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::VPC', 1);
});

test('Vpcのサイダーが10.0.0.0/21であること', () => {
    const app = new cdk.App();
    const stack = new Assignment.AssignmentStack(app, 'AssignmentStack');

    const template = assertions.Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/21'
    });
});

test('VpcのNameタグがreservation-vpcであること', () => {
    const app = new cdk.App();
    const stack = new Assignment.AssignmentStack(app, 'AssignmentStack');

    const template = assertions.Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
        Tags: [{ 'Key': 'Name', 'Value': 'reservation-vpc'}]
    });
});
