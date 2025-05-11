package utils

import(
	"golang.org/x/crypto/argon2"
	"crypto/rand"
	"log"
	"crypto/subtle"
    "encoding/base64"
   	"fmt"
    "errors"
    "strings"
)

type encryptionParams struct{
	memory uint32 
	iterations uint32
	parallelism uint8
	saltLength uint32
	keyLength uint32
}
func EncryptPass(passwordString string)(hashedString string,err error){
    var custom_parameters *encryptionParams= &encryptionParams{
           memory:      32 * 1024,
           iterations:  2,
           parallelism: 2,
           saltLength:  16,
           keyLength:   32,
       }
    salt, err := generateSalt(custom_parameters.saltLength)
	if err!=nil{
		log.Print("Error occuered during hashing")
		return 
	}

	hash:=argon2.IDKey([]byte(passwordString),salt,custom_parameters.iterations,
					  custom_parameters.memory,custom_parameters.parallelism,custom_parameters.keyLength)
    b64Salt := base64.RawStdEncoding.EncodeToString(salt)
    b64Hash := base64.RawStdEncoding.EncodeToString(hash)
    hashedString = fmt.Sprintf("$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s", argon2.Version, custom_parameters.memory, custom_parameters.iterations, custom_parameters.parallelism, b64Salt, b64Hash)

	return


}


func ComparePasswordAndHash(password, encodedHash string) (match bool, err error) {
    
    p, salt, hash, err := decodeHash(encodedHash)
    if err != nil {
        return false, err
    }

    otherHash := argon2.IDKey([]byte(password), salt, p.iterations, p.memory, p.parallelism, p.keyLength)


    if subtle.ConstantTimeCompare(hash, otherHash) == 1 {
        return true, nil
    }
    return false, nil
}

func decodeHash(encodedHash string) (p *encryptionParams, salt, hash []byte, err error) {
    vals := strings.Split(encodedHash, "$")
    if len(vals) != 6 {
        return nil, nil, nil, errors.New("the encoded hash is not in the correct format")
    }

    var version int
    _, err = fmt.Sscanf(vals[2], "v=%d", &version)
    if err != nil {
        return nil, nil, nil, err
    }
    if version != argon2.Version {
        return nil, nil, nil, errors.New("incompatible version of argon2")
    }

    p = &encryptionParams{}
    _, err = fmt.Sscanf(vals[3], "m=%d,t=%d,p=%d", &p.memory, &p.iterations, &p.parallelism)
    if err != nil {
        return nil, nil, nil, err
    }

    salt, err = base64.RawStdEncoding.Strict().DecodeString(vals[4])
    if err != nil {
        return nil, nil, nil, err
    }
    p.saltLength = uint32(len(salt))

    hash, err = base64.RawStdEncoding.Strict().DecodeString(vals[5])
    if err != nil {
        return nil, nil, nil, err
    }
    p.keyLength = uint32(len(hash))

    return p, salt, hash, nil
}

func generateSalt(n uint32) (salt []byte,err error) {
    salt = make([]byte, n)
    _, err = rand.Read(salt)
    if err != nil {
        salt=nil
		err=err
    }
	return
}