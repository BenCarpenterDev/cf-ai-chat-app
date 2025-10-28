# Cloudflare AI Assignment - Humour Chatbot

### **Overview**

The application consists of two main parts:
*  **(`/src/index.ts`)**: This function receives a prompt from the user, forwards it to the Cloudflare Workers AI model, using "@cf/meta/llama-3.3-70b-instruct-fp8-fast", and returns a response.

*  **(`/index.html`)**: A HTML page with JavaScript that provides a messaging chatbot user interface.


### **How to Run Locally**

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run dev
    ```