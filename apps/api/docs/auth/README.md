# User registration process flow chart

```mermaid
flowchart TD
    A([Start]) --> B{Registered?}
    B --> |Yes| C1>Display sign-in form]
    B --> |No| C2>Display sign-up form]
    C2 --> D{Method}
    D --> E[Sign-up]--> F1[[Registration]] --> E1
    D --> F[SSO] --> F2[[Authentication]] --> H
    E1[[Account activation]] --> G --> H
    G[Account activated]
    H([User registered]) --> C1
    C1 --> C11[[Sign-in]]
    C11 --> K{Activated?}
    K --> |No| K1[[Account activation]]
    K1 --> G2[Account activated ]
    G2 --> M
    K --> |Yes| M([End])

```

## TODO

- [ ] Add auth entity for storing user authentication method with following fields:
  - user
  - active
  - method
  - provider
  - [ ] Add loginSocial and registerSocial method for social authentication
- [ ] Return user object with system fields (createdAt, updatedAt, activated, enabled etc) only for admin and super admin from login, activate and register methods
- [ ] Add session entity for storing users sessions method with following fields:
  - [ ] user
  - [ ] expires at
  - [ ] ip
  - [ ] user agent
  - [ ] device
- [ ] Add token entity for storing custom tokens for different actions such as:
  - [ ] password reset
  - [ ] account activation
- When disabling a user account, we need to send an email to the user to let them know that their account has been disabled.
  - create an endpoint to disable a user account
