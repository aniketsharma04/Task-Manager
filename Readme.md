# **Pro Manage - Task Management Application**

A Task Management Application built with React, Express.js, and Supabase. Organize personal and team-based tasks, track progress, and collaborate with others.

---

## Project Overview

_A task management app where users can organize their personal and team-based tasks, track progress, and share task updates. Users can manage their task boards with features to create, edit, assign, and delete tasks for themselves and other members._

---

## **Table of Contents**

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Setup Instructions](#setup-instructions)
-   [Scripts](#scripts)
-   [Author](#author)

---

## **Features**

-   User authentication powered by Supabase Auth.
-   Row Level Security (RLS) for data protection.
-   State management with Redux Toolkit.
-   Toast notifications for user feedback.
-   RESTful APIs for seamless frontend-backend communication.

### **Core Functionalities**

-   **User Authentication:**

    -   Users can register and log in.
    -   Only authenticated users can create and manage tasks.

-   **Task Management:**

    -   Create tasks with priority, optional due dates, checklists, and categories.
    -   Share tasks with others (read-only public access for shared tasks).
    -   Update tasks including title, priority, and due dates.
    -   Delete tasks.
    -   Change task statuses across four categories: **Backlog**, **To-Do**, **In-Progress**, and **Done**.
    -   Automatically highlight overdue tasks with red and completed tasks with green.

-   **User Management:**

    -   Users can update their name, email, or password via the settings page.

-   **Analytics & Filtering:**

    -   Review task analytics in a dedicated section.
    -   Filter tasks by **Today**, **This Week**, or **This Month**.

-   **Collaboration:**
    -   Add members to task boards.
    -   Assign members to tasks during creation.

---

## **Tech Stack**

### **Frontend**

-   **React 18** - UI library
-   **Vite** - Build tool
-   **Redux Toolkit** - State management
-   **React Router DOM** - Routing
-   **React Toastify** - Notifications
-   **React Icons** - Icon library

### **Backend**

-   **Express.js** - Backend framework
-   **Supabase** - Database (PostgreSQL) & Authentication
-   **Dotenv** - Environment variable management
-   **Cors** - Cross-origin resource sharing

---

## **Setup Instructions**

### **Prerequisites**

-   Node.js (v18+)
-   npm
-   A [Supabase](https://supabase.com) project

### **Supabase Setup**

1. Create a new project on [Supabase](https://supabase.com).
2. Run the following SQL in the **SQL Editor** to create the required tables:

    ```sql
    -- Profiles Table
    CREATE TABLE public.profiles (
        id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        board JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

    -- Tasks Table
    CREATE TABLE public.tasks (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        priority TEXT NOT NULL,
        category TEXT DEFAULT 'to-do' NOT NULL,
        checklist JSONB DEFAULT '[]'::jsonb NOT NULL,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        assign TEXT,
        due_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can view tasks" ON public.tasks FOR SELECT USING (
        auth.uid() = user_id OR
        assign = (SELECT email FROM public.profiles WHERE id = auth.uid())
    );
    CREATE POLICY "Users can create their own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Users can delete their own tasks" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

    -- Auto-create profile on signup
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.profiles (id, name, email)
        VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'), NEW.email);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    ```

3. Copy your **Supabase URL**, **anon public key**, and **service role key** from Settings > API.

### **Backend Setup**

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend directory:
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_anon_public_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    FRONTEND_URL=http://localhost:5173
    PORT=9000
    ```
4. Start the server:
    ```bash
    npm run dev
    ```

### **Frontend Setup**

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the frontend directory:
    ```env
    VITE_BACKEND_URL=http://localhost:9000
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open the application at `http://localhost:5173`.

---

## **Scripts**

### **Frontend**

| Script            | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the development server.            |
| `npm run build`   | Builds the production version of the app. |
| `npm run preview` | Previews the built application.           |

### **Backend**

| Script          | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run start` | Starts the server in production mode.                |
| `npm run dev`   | Starts the server in development mode using nodemon. |

---

## **Author**

Aniket Sharma\
Email: aniketsharma.ani05@gmail.com\
LinkedIn: [linkedin.com/in/aniket-sharma-07ba6617b](https://www.linkedin.com/in/aniket-sharma-07ba6617b/)

## **License**

This project is licensed under the [MIT License](LICENSE).
