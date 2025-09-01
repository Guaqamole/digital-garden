## Setup
### Kubeflow
https://www.kubeflow.org/docs/started/installing-kubeflow/
on aws: https://awslabs.github.io/kubeflow-manifests/docs/deployment/
- https://velog.io/@moey920/AWS-EKS-Cognito-Route53-ACM-VPC-EC2%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-KUBEFLOW%EB%A5%BC-%EA%B5%AC%EC%B6%95%ED%95%B4%EB%B3%B4%EC%9E%90
on local: https://github.com/kubeflow/manifests?tab=readme-ov-file#install-individual-components

- kfctl
- istio
- artifact to s3
- backend to mysql
- train in cloud


### MLFlow
- tracking server
- model registry
- artifact save
→ integrate with kubeflow


----


## Learn How to Use
### Kubeflow
- central dashboard
- kubeflow notebook
- kubeflow pipeline
- katib
- kfserving, seldon
- training operator

### Kubeflow components
| Component                 | Local Manifests Path                             | Upstream Revision                                                                                          | Install |
| ------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------- |
| Training Operator         | apps/training-operator/upstream                  | [v1.8.0-rc.0](https://github.com/kubeflow/training-operator/tree/v1.8.0-rc.0/manifests)                    | ✅       |
| Notebook Controller       | apps/jupyter/notebook-controller/upstream        | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/notebook-controller/config)           | ❌       |
| PVC Viewer Controller     | apps/pvcviewer-roller/upstream                   | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/pvcviewer-controller/config)          |         |
| Tensorboard Controller    | apps/tensorboard/tensorboard-controller/upstream | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/tensorboard-controller/config)        |         |
| Central Dashboard         | apps/centraldashboard/upstream                   | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/centraldashboard/manifests)           |         |
| Profiles + KFAM           | apps/profiles/upstream                           | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/profile-controller/config)            |         |
| PodDefaults Webhook       | apps/admission-webhook/upstream                  | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/admission-webhook/manifests)          |         |
| Jupyter Web App           | apps/jupyter/jupyter-web-app/upstream            | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/crud-web-apps/jupyter/manifests)      |         |
| Tensorboards Web App      | apps/tensorboard/tensorboards-web-app/upstream   | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/crud-web-apps/tensorboards/manifests) |         |
| Volumes Web App           | apps/volumes-web-app/upstream                    | [v1.8.0](https://github.com/kubeflow/kubeflow/tree/v1.8.0/components/crud-web-apps/volumes/manifests)      |         |
| Katib                     | apps/katib/upstream                              | [v0.17.0-rc.0](https://github.com/kubeflow/katib/tree/v0.17.0-rc.0/manifests/v1beta1)                      |         |
| KServe                    | contrib/kserve/kserve                            | [0.12.1](https://github.com/kserve/kserve/tree/0.12.1/install/v0.12.1)                                     |         |
| KServe Models Web App     | contrib/kserve/models-web-app                    | [v0.10.0](https://github.com/kserve/models-web-app/tree/v0.10.0/config)                                    |         |
| Kubeflow Pipelines        | apps/pipeline/upstream                           | [2.2.0](https://github.com/kubeflow/pipelines/tree/2.2.0/manifests/kustomize)                              |         |
| Kubeflow Tekton Pipelines | apps/kfp-tekton/upstream                         | [2.0.5](https://github.com/kubeflow/kfp-tekton/tree/2.0.5/manifests/kustomize)                             |         |
| Kubeflow Model Registry   | apps/model-registry/upstream                     | [v0.2.0-alpha](https://github.com/kubeflow/model-registry/tree/v0.2.0-alpha/manifests/kustomize)           |         |


### MLFlow
- model registry
- tracking server




---

## Documentation (user-guide)
### Use Case for each Functionality
- authentication (google)
- 
- creating notebook
- mounting repo (https://www.youtube.com/watch?v=gHQcSwqrRcU)
- using database → rds
- train and save artifact to s3 → linear regression transfer learning
- integrating
- mlflow model versioning → linear regression
- mlflow model save → linear regression
- pipeline → cat dog
- gpu using karpenter → deep learning
- 