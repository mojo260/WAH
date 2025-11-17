-- Create contacts table
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_processed ON contacts(processed);
CREATE INDEX idx_contacts_email ON contacts(email);