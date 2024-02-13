# User registration process diagram

```mermaid
sequenceDiagram
    autonumber
    actor C as Client
    participant S as Server
    participant DB as Database
    C->>+S: Login (Username, Password)
        S->>+DB: Select User Info
            note over DB: Password is not stored in database
        DB-->>-S: Salt & Hash

        S->>S: Check Computed Hash using Salt
        alt Computed Hash Matches
            S->>S: Generate JWT
            S-->>C: 200 OK & JWT
        else No user or wrong password
            S-->>C: 401 Unauthorized
        end
        note over C, S: Subsequent requests include JWT
    deactivate S
```
