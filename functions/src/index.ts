import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const createClub = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to create a club'
    );
  }

  const { name, description } = data;

  // Validate input
  if (!name || !description) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Club name and description are required'
    );
  }

  try {
    // Check if user is admin
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(context.auth.uid)
      .get();

    if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only admin users can create clubs'
      );
    }

    // Check if club with same name exists
    const existingClub = await admin.firestore()
      .collection('clubs')
      .where('name', '==', name)
      .get();

    if (!existingClub.empty) {
      throw new functions.https.HttpsError(
        'already-exists',
        'A club with this name already exists'
      );
    }

    // Create the club
    const clubRef = await admin.firestore().collection('clubs').add({
      name,
      description,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { id: clubRef.id };
  } catch (error) {
    console.error('Error creating club:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create club'
    );
  }
}); 