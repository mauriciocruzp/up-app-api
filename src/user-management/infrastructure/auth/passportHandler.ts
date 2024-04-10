import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import UserModel from "../../../database/mysql/models/user.model";
import dotenv from "dotenv";
import { BcryptUtils } from "../utils/bcrypt.utils";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"},async function (email, password, done) {
  const user = await UserModel.findOne({ where: { email } });
  console.log(user);
  if (!user) {
    return done(undefined, false, { message: `username with email: ${email} not found.` });
  }

  BcryptUtils.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      return done(undefined, user);
    }
    return done(undefined, false, { message: "Invalid username or password." });
  });
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET || ""
}, function (jwtToken, done) {
  const email = jwtToken.email;
  const user = UserModel.findOne({ where: { email } });

  if (!user) {
    return done(undefined, false);
  }
  return done(undefined, user, jwtToken);
}));

