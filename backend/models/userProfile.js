// models/userProfile.js

// Define the UserProfile model
class UserProfile {
    constructor(email, fullname, dob) {
        this.email = email;
        this.fullname = fullname;
        this.dob = dob;
    }

    // Method to convert UserProfile instance to JSON object
    toJSON() {
        return {
            email: this.email,
            fullname: this.fullname,
            dob: this.dob
        };
    }
}

module.exports = UserProfile;
