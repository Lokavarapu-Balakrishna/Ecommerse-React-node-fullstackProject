const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Generate auth token
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.emailVerificationToken = token;
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    return token;
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.emailVerificationToken;
    delete user.emailVerificationExpires;
    delete user.resetPasswordToken;
    delete user.resetPasswordExpires;
    return user;
};

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login credentials');
    }
    return user;
};

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 