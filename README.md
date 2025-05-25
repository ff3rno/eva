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
    Configuration is primarily managed through environment variables, which can be conveniently set using a `.env` file for local development. The file `src/config.ts` (now tracked in the repository) contains the logic to load these environment variables.

    *   **Using a `.env` File (Recommended for Local Development):**
        1.  Create a `.env` file in the project root. You can use `.env.example` as a template:
            ```bash
            cp .env.example .env
            ```
        2.  Edit your `.env` file and provide your specific API keys and model preference:
            ```dotenv
            # .env
            TELEGRAM_API_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
            OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
            OPENAI_MODEL=gpt-4o-mini # Or your preferred model like gpt-4, gpt-3.5-turbo
            ```
        *   The application, through `src/config.ts` and `dotenv` (loaded in `src/index.ts`), will automatically load these variables from your `.env` file.
        *   **Important Security Note:** The `.env` file is (and should remain) in `.gitignore` to prevent accidental commitment of your sensitive API keys.

    *   **`src/config.ts` (Default Configuration Logic):**
        The file `src/config.ts` is included in the repository and contains the default logic for loading configuration values from `process.env`. It defines fallback values (e.g., for `defaultOpenAIModel`) if the corresponding environment variables are not set. You typically do not need to modify this file unless you are changing the core configuration logic or default fallbacks.

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

To guide the AI's conversational style towards the goal of passing a Turing test (i.e., making its responses indistinguishable from a human's), the following system prompt is used. This prompt is defined in `src/openAIProxy.ts` and sent to the OpenAI API (defaulting to the `gpt-4o-mini` model, or as configured) with each user message.

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
*   `src/config.ts`: Contains the default configuration logic for the application. It sources values primarily from environment variables (which can be populated by a `.env` file or system environment variables) and provides fallback defaults (e.g., `gpt-4o-mini` for the OpenAI model). This file is tracked by Git.
*   `.env` (Not in repo, in `.gitignore`): Used to store your specific API keys (`TELEGRAM_API_TOKEN`, `OPENAI_API_KEY`) and model preference (`OPENAI_MODEL`) for local development.
*   `.env.example`: An example template for creating your local `.env` file.
*   `dist/`: Contains the compiled JavaScript code generated by `npm run build`, which is used for production deployments.
*   `package.json`: Defines project metadata, dependencies, and npm scripts.
*   `tsconfig.json`: Configuration file for the TypeScript compiler.
*   `README.md`: This file, providing an overview and instructions for the project.

---

Feel free to contribute by opening issues or submitting pull requests!
