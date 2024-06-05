import bcrypt from 'bcrypt'

export const hashPassword= async(pass)=>{
    try{
        const saltRounds=10;
        const Hashedpass=await bcrypt.hash(pass,saltRounds);
        return Hashedpass;
    }catch(error){
        console.log(error);
    }
} 
export const comparepassword=async (pass,Hashedpass)=>{
    return bcrypt.compare(pass,Hashedpass);
}