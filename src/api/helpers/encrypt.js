const bcrypt = require('bcrypt')

const genHash = async (plainText) => {
    try{
        const hash = await bcrypt.hash(plainText, 8);
        return hash;
    } catch (err) {
        throw err;
    }
}

const verify = async (plainText, hash) => {
    try{
        const isVerified = bcrypt.compare(plainText, hash);
        return isVerified;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    genHash,
    verify
}