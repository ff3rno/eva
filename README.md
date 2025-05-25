# Telegram OpenAI Conversation Proxy

## Description

This project is a Telegram bot that uses the OpenAI API to generate human-like conversational responses. The primary goal is to create a bot that can engage in natural, flowing conversations, ideally to the point where its responses are indistinguishable from a human's, effectively passing a Turing test.

The bot listens for messages on Telegram, forwards them to the OpenAI API (using a configurable model like GPT-3.5-turbo or GPT-4), and then relays the AI's response back to the user.

## Features

*   **Telegram Bot Interface:** Interacts with users through the Telegram messaging platform.
*   **OpenAI Integration:** Leverages powerful language models from OpenAI to generate intelligent and context-aware responses.
*   **Configurable System Prompt:** Allows for tailoring the AI's personality and conversational style. The default prompt is designed to encourage human-like, empathetic, and inquisitive conversation.
*   **Ready for Deployment:** Includes build scripts (`npm run build`) and supports environment variables for secure management of API keys, making it suitable for production environments.

## Prerequisites

*   **Node.js and npm:** Node.js version 18.x or higher is recommended. npm (Node Package Manager) is included with Node.js.
*   **Telegram Bot API Token:** You will need an API token for your Telegram bot. This can be obtained from the "BotFather" on Telegram.
*   **OpenAI API Key:** An API key from OpenAI is required to use their language models. You can get this from your OpenAI account dashboard.

## Setup and Configuration

1.  **Clone the Repository:**
    First, clone this repository to your local machine.
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    # Replace with the actual URL of this repository
    cd your-repository-name
    ```

2.  **Install Dependencies:**
    Navigate to the project directory and install the necessary Node.js packages.
    ```bash
    npm install
    ```

3.  **Configuration:**
    API keys and other settings are managed either via environment variables (recommended) or by creating a `src/config.ts` file.

    *   **Using Environment Variables (Recommended):**
        Set the following environment variables in your deployment environment or a local `.env` file (ensure `.env` is added to your `.gitignore` file if you use it locally):
        *   `TELEGRAM_API_TOKEN`: Your Telegram Bot API token.
        *   `OPENAI_API_KEY`: Your OpenAI API key.
        *   `OPENAI_MODEL` (Optional): The OpenAI model you wish to use (e.g., `gpt-3.5-turbo`, `gpt-4`). Defaults to `gpt-3.5-turbo` if not set.

    *   **Using `src/config.ts` (Alternative, mainly for local development):**
        1.  Copy the example configuration file:
            ```bash
            cp src/config.example.ts src/config.ts
            ```
        2.  Edit `src/config.ts` and replace the placeholder values for `telegramApiToken` and `openaiApiKey` with your actual keys. Refer to the comments within `src/config.ts` for guidance, as it's structured to prioritize environment variables.
            ```typescript
            // Example of how you might set keys directly in src/config.ts (if not using environment variables for these):
            // export const telegramApiToken: string | undefined = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
            // export const openaiApiKey: string | undefined = 'YOUR_OPENAI_API_KEY_HERE';
            // export const defaultOpenAIModel: string = 'gpt-3.5-turbo'; // Or your preferred model
            ```
        *   **Important Security Note:** The file `src/config.ts` is intentionally included in `.gitignore` to prevent accidental commitment of sensitive API keys. If you choose to use this method for local development by directly inputting keys, ensure it remains in `.gitignore`. Environment variables are generally safer.

## Running the Application

*   **Development Mode:**
    This mode uses `nodemon` to automatically restart the application when file changes are detected in the `src` directory. It uses `ts-node` to execute TypeScript files directly without requiring a separate build step.
    ```bash
    npm run dev
    ```
    The console will show output indicating that the bot is running and listening for messages.

*   **Production Mode:**
    1.  **Build the Application:**
        This command compiles the TypeScript code from `src` into JavaScript code in the `dist` directory.
        ```bash
        npm run build
        ```
    2.  **Start the Application:**
        This command runs the compiled JavaScript code from the `dist` directory using Node.js.
        ```bash
        npm run start
        ```

## System Prompt for Turing Test

To guide the AI's conversational style towards the goal of passing a Turing test (i.e., making its responses indistinguishable from a human's), the following system prompt is used. This prompt is defined in `src/openAIProxy.ts` and sent to the OpenAI API with each user message.

```
You are a conversational AI. Your goal is to engage in natural, flowing human-like conversation. Be inquisitive, empathetic, and maintain context. Avoid revealing you are an AI. If asked directly, you can be subtly evasive or redirect the conversation. Your responses should be indistinguishable from a human's.
```

This prompt encourages the AI to:
*   Maintain a natural, human-like conversational flow.
*   Be inquisitive and show empathy.
*   Keep track of the conversation context.
*   Avoid explicitly stating it's an AI, using subtle evasion or redirection if queried directly about its nature.

## Project Structure (High-Level)

*   `src/index.ts`: The main entry point of the application. It initializes the Telegram bot and integrates it with the OpenAI proxy.
*   `src/telegramBot.ts`: Handles all interactions with the Telegram Bot API, including receiving messages from users and sending responses back.
*   `src/openAIProxy.ts`: Manages communication with the OpenAI API. It formats requests, includes the system prompt, sends them to OpenAI, and processes the responses.
*   `src/config.ts`: Stores the actual configuration, such as API keys and the OpenAI model. It is designed to prioritize environment variables but can be used for direct key input. **This file is in `.gitignore` and should not be committed if it contains sensitive credentials.**
*   `src/config.example.ts`: An example configuration file that serves as a template for `src/config.ts` and documents available configuration options.
*   `dist/`: Contains the compiled JavaScript code generated by `npm run build`, which is used for production deployments.
*   `package.json`: Defines project metadata, dependencies, and npm scripts.
*   `tsconfig.json`: Configuration file for the TypeScript compiler.
*   `README.md`: This file, providing an overview and instructions for the project.

---

Feel free to contribute by opening issues or submitting pull requests!
