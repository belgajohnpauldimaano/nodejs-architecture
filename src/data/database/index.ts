import mongoose from 'mongoose';
export class Database {
  mongo?: mongoose.Mongoose;
  connectionString: string;
  constructor(config: any) {
    this.connectionString = config.connectionString;
    console.log(this.connectionString, 'connectionString');
  }
  async connect() {
    console.log('aaaaaaaaa');
    try {
      this.mongo = await mongoose.connect(this.connectionString, {
        useNewUrlParser: true,
      });
      console.log('DB Connected');
    } catch (error) {
      console.log(error, 'DB Connection Error');
    }
  }
  async disconnect() {
    if (this.mongo) {
      await this.mongo.disconnect();
    }
  }
}
