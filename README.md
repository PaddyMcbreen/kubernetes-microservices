# Kubernetes - Multiple Applications

Let's explore further containerising and deploying further applications in Kubernetes.

## Scenario

You might recall the smart home suite of applications. As a reminder, that suite of API's included a heating API, the lights API and a status API. The status API called into the respective API's to obtain information about the heating and lights.

Your goal of this exercise is to get those applications deployed as containers on your cluster.

## Instructions

## 1. Building the applications

The applications you are going to be working with are:

* [ce-smart-home-status](https://github.com/northcoders/ce-smart-home-status)

* [ce-smart-home-heating](https://github.com/northcoders/ce-smart-home-heating)

* [ce-smart-home-lights](https://github.com/northcoders/ce-smart-home-lights)

Within each of those repositories, you will find a Dockerfile.

Using your newly developed Docker knowledge, your task for this step is to build a docker image for each of the applications and push it up to your Docker Hub container registry.

Once you have built your docker images and pushed that image up to Docker Hub head on to step 2.

## 2. Deploying heating service to kubernetes

Once you have your Docker images it is time to deploy them to your Kubernetes cluster.

Starting with the heating service, deploy this by filling out the [heating-deployment.yaml](./kubernetes/heating-deployment.yaml) and the [heating-service.yaml](./kubernetes/heating-service.yaml) files.

You can use previous YAML files from other exercises to guide you on the structure of those files

At this point, your heating service should NOT be exposed externally to the cluster.

Have a read of the different types of [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) to help identify what **type** of service should be used.

Once you have completed the deployment and service YAML files for the heating API and `kubectl apply`ied them to your cluster you can check if they are running successfully by running

`kubectl get pods`

and 

`kubectl get services`

You should see your heating pods and service listed.

Once happy, commit and push your code then head on to step 3 🙌

## 3. Lighting up your world

Repeat the step 2 but this time for the lighting API. 

You will see a [deployment](./kubernetes/lights-deployment.yaml) and [service](./kubernetes/lights-service.yaml) for the lighting API.

Again your lighting API should NOT be exposed externally.

## 4. What is the status?

The final service to deploy is the status service.

The status service calls the heating and lights services to obtain information.

In this step you will need to deploy the status service to your kubernetes cluster by completing the [service](./kubernetes/status-service.yaml) and [deployment](./kubernetes/status-deployment.yaml).

There are a few key parts to the status service

* It SHOULD be exposed externally and you should be able to hit the API endpoint on the following URL: [http://localhost:3002/api/status](http://localhost:3002/api/status)

* It should respond with the status of the light and heating services. If you see it state `{ status: false }` for either of the services then it has been misconfigured.

* It should communicate with the lights and heating service using the [Kubernetes internal DNS for service](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

* You should not have to rebuild the Docker image for the status service in order to point it at the correct endpoints for the heating and lighting


