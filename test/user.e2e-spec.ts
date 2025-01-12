import { INestApplication } from '@nestjs/common';
import { setupTestApp } from 'utils/setupTestApp';
import * as request from 'supertest';

describe('User E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Initialize the test application
    app = await setupTestApp();
    await app.init(); // Start the app
  });

  describe('POST /user', () => {
    it('should create a new user successfully', async () => {
      // Arrange: Define the user details to send in the request
      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'securePassword123',
        phoneNumber: '1234567890',
      };

      // Act: Make a POST request to create a new user
      const res = await request(app.getHttpServer())
        .post('/user') // Replace with the actual route
        .send(newUser);

      // Assert: Verify the response
      expect(res.status).toBe(201); // 201 Created
      expect(res.body).toMatchObject({
        message: 'User created sucessfully',
        data: {
          id: expect.any(String),
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          password: expect.any(String), // Expect password to be hashed
          createdAt: expect.any(String),
        },
      });
    });

    it('should return validation error for missing fields', async () => {
      const res = await request(app.getHttpServer()).post('/user').send({
        name: '', // Invalid empty name
        email: 'invalid-email', // Invalid email format
        password: '', // Invalid empty password
        phoneNumber: '', // Invalid empty phoneNumber
      });

      // Assert the response status
      expect(res.status).toBe(400); // Bad Request

      // Assert the validation error messages
      expect(res.body.message).toEqual([
        'name should not be empty',
        'email must be an email',
        'password should not be empty',
        'phoneNumber should not be empty',
      ]);
    });
  });

  afterAll(async () => {
    // Close the app after all tests
    await app.close();
  });
});
