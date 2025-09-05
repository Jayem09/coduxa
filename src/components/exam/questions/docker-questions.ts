// Docker & Kubernetes Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const dockerBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 1),
    'What is Docker?',
    ['A containerization platform', 'A programming language', 'A database', 'A web server'],
    'A containerization platform',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-fundamentals', 2),
    'Docker allows applications to run consistently across different environments',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 3),
    'What is a Docker container?',
    ['A virtual machine', 'A lightweight, standalone package that includes everything needed to run an application', 'A programming language', 'A database'],
    'A lightweight, standalone package that includes everything needed to run an application',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-fundamentals', 4),
    'A ___ is a template used to create Docker containers.',
    'Docker image',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 5),
    'Which command is used to build a Docker image?',
    ['docker create', 'docker build', 'docker make', 'docker generate'],
    'docker build',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-fundamentals', 6),
    'Docker containers share the host operating system kernel',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 7),
    'Which command is used to run a Docker container?',
    ['docker start', 'docker run', 'docker execute', 'docker launch'],
    'docker run',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 8),
    'What is the purpose of a Dockerfile?',
    ['To run containers', 'To define how to build a Docker image', 'To manage containers', 'To store data'],
    'To define how to build a Docker image',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-fundamentals', 9),
    'Docker containers are more lightweight than virtual machines',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 10),
    'Which command is used to list running Docker containers?',
    ['docker list', 'docker ps', 'docker show', 'docker containers'],
    'docker ps',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 11),
    'What is Docker Hub?',
    ['A programming language', 'A cloud-based registry for Docker images', 'A database', 'A web server'],
    'A cloud-based registry for Docker images',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-fundamentals', 12),
    'Docker containers can be easily moved between different environments',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 13),
    'Which command is used to pull a Docker image from a registry?',
    ['docker get', 'docker pull', 'docker fetch', 'docker download'],
    'docker pull',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-fundamentals', 14),
    'The ___ command is used to stop a running Docker container.',
    'docker stop',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-fundamentals', 15),
    'What is the purpose of Docker volumes?',
    ['To store container images', 'To persist data outside of containers', 'To run containers', 'To build images'],
    'To persist data outside of containers',
    4
  )
];

// INTERMEDIATE QUESTIONS
export const dockerIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 1),
    'What is the purpose of Docker Compose?',
    ['To build images', 'To define and run multi-container Docker applications', 'To manage volumes', 'To create networks'],
    'To define and run multi-container Docker applications',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 2),
    'Which file is used to define services in Docker Compose?',
    ['Dockerfile', 'docker-compose.yml', 'docker.yml', 'compose.yml'],
    'docker-compose.yml',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-intermediate', 3),
    'Docker networks allow containers to communicate with each other',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 4),
    'What is the purpose of the FROM instruction in a Dockerfile?',
    ['To run commands', 'To set the working directory', 'To specify the base image', 'To expose ports'],
    'To specify the base image',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-intermediate', 5),
    'The ___ instruction in a Dockerfile is used to copy files from the host to the container.',
    'COPY',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 6),
    'Which command is used to remove a Docker container?',
    ['docker delete', 'docker remove', 'docker rm', 'docker destroy'],
    'docker rm',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 7),
    'What is the purpose of the EXPOSE instruction in a Dockerfile?',
    ['To run commands', 'To set environment variables', 'To document which ports the container listens on', 'To copy files'],
    'To document which ports the container listens on',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-intermediate', 8),
    'Docker images are built in layers',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 9),
    'Which command is used to view Docker image layers?',
    ['docker layers', 'docker history', 'docker show', 'docker inspect'],
    'docker history',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 10),
    'What is the purpose of Docker tags?',
    ['To run containers', 'To identify specific versions of images', 'To manage volumes', 'To create networks'],
    'To identify specific versions of images',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-intermediate', 11),
    'Docker containers are stateless by default',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 12),
    'Which command is used to execute commands inside a running container?',
    ['docker run', 'docker exec', 'docker execute', 'docker command'],
    'docker exec',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 13),
    'What is the purpose of the WORKDIR instruction in a Dockerfile?',
    ['To run commands', 'To set the working directory', 'To copy files', 'To expose ports'],
    'To set the working directory',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-intermediate', 14),
    'The ___ command is used to remove unused Docker images.',
    'docker image prune',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-intermediate', 15),
    'What is the purpose of Docker health checks?',
    ['To build images', 'To monitor container health', 'To manage volumes', 'To create networks'],
    'To monitor container health',
    4
  )
];

// ADVANCED QUESTIONS
export const dockerAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 1),
    'What is the purpose of multi-stage builds in Docker?',
    ['To run multiple containers', 'To create smaller final images by using multiple build stages', 'To manage volumes', 'To create networks'],
    'To create smaller final images by using multiple build stages',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 2),
    'What is Docker Swarm?',
    ['A container runtime', 'A native clustering and orchestration solution for Docker', 'A registry', 'A networking tool'],
    'A native clustering and orchestration solution for Docker',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-advanced', 3),
    'Docker supports both Linux and Windows containers',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 4),
    'What is the purpose of Docker secrets?',
    ['To store container images', 'To securely manage sensitive data', 'To run containers', 'To build images'],
    'To securely manage sensitive data',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-advanced', 5),
    'The ___ command is used to create a Docker network.',
    'docker network create',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 6),
    'What is the purpose of Docker build context?',
    ['To run containers', 'The set of files that can be accessed during the build process', 'To manage volumes', 'To create networks'],
    'The set of files that can be accessed during the build process',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 7),
    'Which command is used to inspect a Docker container?',
    ['docker show', 'docker inspect', 'docker view', 'docker display'],
    'docker inspect',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-advanced', 8),
    'Docker containers can be configured with resource limits',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 9),
    'What is the purpose of Docker overlay networks?',
    ['To build images', 'To enable communication between containers on different hosts', 'To manage volumes', 'To run containers'],
    'To enable communication between containers on different hosts',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 10),
    'Which command is used to save a Docker image to a tar file?',
    ['docker export', 'docker save', 'docker backup', 'docker archive'],
    'docker save',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('docker-advanced', 11),
    'Docker supports both imperative and declarative configuration',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 12),
    'What is the purpose of Docker buildkit?',
    ['To run containers', 'To provide enhanced build capabilities', 'To manage volumes', 'To create networks'],
    'To provide enhanced build capabilities',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 13),
    'Which command is used to load a Docker image from a tar file?',
    ['docker import', 'docker load', 'docker restore', 'docker extract'],
    'docker load',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('docker-advanced', 14),
    'The ___ command is used to view Docker system information.',
    'docker system info',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('docker-advanced', 15),
    'What is the purpose of Docker content trust?',
    ['To build images', 'To verify the integrity and publisher of images', 'To manage volumes', 'To create networks'],
    'To verify the integrity and publisher of images',
    5
  )
];

// KUBERNETES QUESTIONS
export const kubernetesQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 1),
    'What is Kubernetes?',
    ['A container runtime', 'A container orchestration platform', 'A registry', 'A networking tool'],
    'A container orchestration platform',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('kubernetes-fundamentals', 2),
    'Kubernetes is also known as K8s',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 3),
    'What is a Pod in Kubernetes?',
    ['A container', 'The smallest deployable unit in Kubernetes', 'A service', 'A volume'],
    'The smallest deployable unit in Kubernetes',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('kubernetes-fundamentals', 4),
    'A ___ in Kubernetes manages a set of Pods.',
    'Deployment',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 5),
    'What is the purpose of a Service in Kubernetes?',
    ['To run containers', 'To expose an application running on a set of Pods', 'To manage volumes', 'To create networks'],
    'To expose an application running on a set of Pods',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 6),
    'Which command is used to create resources in Kubernetes?',
    ['kubectl create', 'kubectl make', 'kubectl generate', 'kubectl new'],
    'kubectl create',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('kubernetes-fundamentals', 7),
    'Kubernetes can automatically scale applications based on demand',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 8),
    'What is a ConfigMap in Kubernetes?',
    ['A container', 'A way to store configuration data', 'A service', 'A volume'],
    'A way to store configuration data',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 9),
    'Which command is used to get information about Kubernetes resources?',
    ['kubectl show', 'kubectl get', 'kubectl list', 'kubectl view'],
    'kubectl get',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('kubernetes-fundamentals', 10),
    'What is the purpose of a Namespace in Kubernetes?',
    ['To run containers', 'To provide a way to divide cluster resources', 'To manage volumes', 'To create networks'],
    'To provide a way to divide cluster resources',
    4
  )
];

// COMBINED EXPORT
export const dockerQuestions: Question[] = [
  ...dockerBeginnerQuestions,
  ...dockerIntermediateQuestions,
  ...dockerAdvancedQuestions,
  ...kubernetesQuestions
];
