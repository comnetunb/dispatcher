// !
// ! Version: MIT
// !
// ! Portions created by Matheus Medeiros are Copyright (c) 2017-2018
// ! Matheus Medeiros. All Rights Reserved.
// !
// ! Permission is hereby granted, free of charge, to any person obtaining a
// ! copy of this software and associated documentation files(the "Software"),
// ! to deal in the Software without restriction, including without limitation
// ! the rights to use, copy, modify, merge, publish, distribute, sublicense,
// ! and / or sell copies of the Software, and to permit persons to whom the
// ! Software is furnished to do so, subject to the following conditions:
// !
// ! The above copyright notice and this permission notice shall be included in
// ! all copies or substantial portions of the Software.
// !
// ! THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// ! IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// ! FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// ! AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// ! LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// ! FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// ! DEALINGS IN THE SOFTWARE.
// !

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  permitted: {
    type: Boolean,
    default: false
  }
});

const saltRounds = 10;

userSchema.statics.encryptPassword = (password, callback) => {
  bcrypt.hash(password, saltRounds, callback);
};

userSchema.methods.validPassword = function (password) { // eslint-disable-line func-names
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
