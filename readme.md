# Heunets Work Item Tracker

This is a mini work item tracker built with Nodejs (Express), Next.js, and TypeScript, featuring state management with React Context API.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository

2. Configure environment variables:

Create a `.env` file in the root server directory:

```bash
# The only environment variable you need
SECRET_KEY = your-secret-value-goes-here 
```
If no environment variable is set, you will not be able to call protected routes successfully.

3. Ensure docker is running on your laptop, then run the command below
```bash
docker-compose up

# Note: This command builds and start the docker image for both client and server
# client: http://localhost:3000
# server: http://localhost:8000
```

4. Copy and paste the client url on the browser to test


### Recommendations for Improvement

#### Scaling
The existing implementation does not scale and there will be a lot of issues as users of the application grows. Here are areas of concentration to sclae the application

1. **Pagination:** As more tickets are being created, the existing implementation will suffer in terms of performance as hundreds or thousands of tickets will be queried from the database. This slows down response time and leads to higher latency. Even though we have dates, status and other parameters filtering for the current implementation, there is still a need to paginate response from the server. This way, we are fetching resources in considerable number of data which will not stretch our server.

2. **Caching:** To further improve performance, we would have to cache commonly fetched resources e.g tickets. One way to cache resources is to use in-memory database such as Redis. This way, we can quickly get commonly fetched resources from the in-memory database (which is faster than disk storage). A caveat to implementing this is to ensure that there's consistency in data we're fetching as it could lead to fetching inconsistent or latent data if not properly implemented.

3. **Microservices:** As the application grows beyond what monolithics could handle, microservice could come in handy by splitting and decoupling the codebase services into their own independent service. We could have two services split into **Identity Service (auth and user management)** and **Ticket Service (work items)**. This should be carefully considered as microservice has its own overhead in its implementation as we would neeed to communicate between services using messaging queues (kafka, rabbitmq, etc). We should only take this initiative if its pros outweights its cons.


### Security

#### Application Level Security
Although, the current implementation already covers many of the basic security implementations, there's still a need to look further into possible vulnerabilites.
For instance, we could also implement Rate Limiting to prevent against DDOS (Distributed Denial Of Service) or Brute-Force attack. 

### Pipeline Level Security
Another aspect we need to secure aside the application is the pipeline process e.g Docker Image. We need to ensure we are not injecting environment variables at build time as these variables could easily be found in our docker image. We should only inject environment variables at runtime.
