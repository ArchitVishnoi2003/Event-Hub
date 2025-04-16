const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getAllUsers = functions.https.onCall(async (data, context) => {
  // Check if the user is an admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can fetch all users'
    );
  }

  try {
    // List all users
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      emailVerified: userRecord.emailVerified,
      disabled: userRecord.disabled,
      metadata: {
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: userRecord.metadata.lastSignInTime
      },
      customClaims: userRecord.customClaims
    }));

    return { users };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error fetching users',
      error.message
    );
  }
}); 