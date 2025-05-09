-- Ensure the table exists (optional if already created by Sequelize)
CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE
    );

-- Insert sample tasks
INSERT INTO tasks (title, completed, archived) VALUES
                                                   ('Buy groceries', false, false),
                                                   ('Finish homework', true, false),
                                                   ('Call mom', false, false),
                                                   ('Submit tax return', true, true),
                                                   ('Clean the house', false, false),
                                                   ('Plan vacation', true, true);