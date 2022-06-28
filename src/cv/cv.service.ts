import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, LessThan, Repository } from 'typeorm';

import { AddCVDto } from './dto/add-cv.dto';

import { cv } from './cv.entity';
import { AspirationService } from 'src/aspiration/aspiration.service';
import { AddAspirationDto } from 'src/aspiration/dto/add-aspiration.dto';
import { AddListCVDto } from './dto/add-listcv.dto';
import { aspiration } from 'src/aspiration/aspiration.entity';
import { major } from 'src/majors/major.entity';
import { typeProgram } from 'src/typePrograms/typeProgram.entity';
import { method } from 'src/methods/method.entity';
import { UpdateCVDto } from './dto/update-cv.dto';
import { UpdateAspirationDto } from 'src/aspiration/dto/update-aspiration.dto';
import { CvaisService } from 'src/cvapplyinformation/cvapplyinformation.service';
import { SaveCVAIDto } from 'src/cvapplyinformation/dto/save-cvai.dto';
import { UsersService } from 'src/users/users.service';
import { EditUserDto } from 'src/users/dto/edit-user-dto';
import { cvapplyinformation } from 'src/cvapplyinformation/cvapplyinformation.entity';
import { user } from 'src/users/users.entity';
import { userInfo } from 'os';
import { UpdateCVAIDto } from 'src/cvapplyinformation/dto/update-cvai.dto';
import { UpdateStatusCVDto } from './dto/update-status.dto';
import { typeoftraining } from 'src/typeOfTraining/typeOfTraining.entity';
import { PdfService } from 'src/generatePdf/generatePdf.service';
import { MailService } from 'src/mail/mail.service';
import { MajorsService } from 'src/majors/majors.service';
import { AdmissionNotificationsService } from 'src/admissionNotifications/admissionNotifications.service';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(cv)
    private readonly cvsRepo: Repository<cv>,
    private readonly aspirationService: AspirationService,
    private readonly cvaiSerivce: CvaisService,
    private readonly userService: UsersService,
    private readonly pdfService: PdfService,
    private readonly mailService: MailService,
    private readonly majorService: MajorsService,
    private readonly notifyService: AdmissionNotificationsService
  ) {}

  async addCv(
    cvMethodId: string,
    cvUserId: string,
    cvFile: string,
  ): Promise<cv> {
    const cv = await this.cvsRepo.create({
      cvMethodId: cvMethodId,
      cvUserId: cvUserId,
      cvFile: cvFile,
      cvDateCreate: new Date(),
      cvState: 'Đã lưu',
    });

    const result = await this.cvsRepo.save(cv);

    return result;
  }

  async addAspiration(CvId: number, typeProgram: string, major: string) {
    const aspirationData = new AddAspirationDto();
    aspirationData.aspirationCvId = CvId;
    aspirationData.aspirationMajor = major;
    aspirationData.aspirationState = '';

    await this.aspirationService.insertAspiration(aspirationData);
  }

  async insertCv(addCVDto: AddCVDto, userId: string) {
    try {
      const {
        method,
        listAspiration,
        fileUrl,
        userName,
        userGender,
        //userPhone,
        //userEmail,
        userEthnicity,
        userNationality,
        userBirthday,
        userBirthplace,
        userContactAddress,
        userProvinceResidence,
        userDistrictResidence,
        userAddress12,
        userSchool12,
        userAddress11,
        userSchool11,
        userAddress10,
        userSchool10,
        userIdentityNumber,
        userWardResidence,
        userStreetResidence,
        ...data
      } = addCVDto;
      // Save cv into cv database
      const { cvId } = await this.addCv(method, userId, fileUrl);

      for (let i = 0; i < listAspiration.length; i++) {
        // Save aspiration into aspiration database
        await this.addAspiration(
          cvId,
          listAspiration[i].typeProgram,
          listAspiration[i].major,
        );
      }

      // Save Information of CV into database
      const cvaiData = new SaveCVAIDto();
      cvaiData.cvaiGraduateUniversity = data.cvaiGraduateUniversity;
      cvaiData.cvaiUniversityGPA = data.cvaiUniversityGPA;
      cvaiData.cvaiUniversityGraduateYear = data.cvaiUniversityGraduateYear;
      cvaiData.cvaiGraduateCollege = data.cvaiGraduateCollege;
      cvaiData.cvaiCollegeGPA = data.cvaiCollegeGPA;
      cvaiData.cvaiCollegeGraduateYear = data.cvaiCollegeGraduateYear;
      cvaiData.cvaiPriorityArea = data.cvaiPriorityArea;
      cvaiData.cvaiGPA12 = data.cvaiGPA12;
      cvaiData.cvaiGPA11 = data.cvaiGPA11;
      cvaiData.cvaiGPA10 = data.cvaiGPA10;
      cvaiData.cvaiHighSchoolGraduateYear = data.cvaiHighSchoolGraduateYear;
      cvaiData.cvaiCapacity12 = data.cvaiCapacity12;
      cvaiData.cvaiConduct12 = data.cvaiConduct12;
      cvaiData.cvaiCapacity11 = data.cvaiCapacity11;
      cvaiData.cvaiConduct11 = data.cvaiConduct11;
      cvaiData.cvaiCapacity10 = data.cvaiCapacity10;
      cvaiData.cvaiConduct10 = data.cvaiConduct10;
      cvaiData.cvaiProvincialExcellentSubject =
        data.cvaiProvincialExcellentSubject;
      cvaiData.cvaiProvincialExcellentYear = data.cvaiProvincialExcellentYear;
      cvaiData.cvaiProvincialExcellentAward = data.cvaiProvincialExcellentAward;
      cvaiData.cvaiIeltsCertificateScore = data.cvaiIeltsCertificateScore;
      cvaiData.cvaiIeltsCertificateExpiration =
        data.cvaiIeltsCertificateExpiration;
      cvaiData.cvaiToeflCertificateScore = data.cvaiToeflCertificateScore;
      cvaiData.cvaiToeflCertificateExpiration =
        data.cvaiToeflCertificateExpiration;
      cvaiData.cvaiHaveVietnameseCertificate =
        data.cvaiHaveVietnameseCertificate;
      cvaiData.cvaiVietnameseCertificateLevel =
        data.cvaiVietnameseCertificateLevel;
      cvaiData.cvaiEmail = data.cvaiEmail;
      cvaiData.cvaiPhone = data.cvaiPhone;

      await this.cvaiSerivce.saveApplyInformationCV(cvaiData, cvId);

      // Update information of user in database
      const userInfo = new EditUserDto();
      userInfo.userName = userName;
      userInfo.userGender = userGender;
      //userInfo.userPhone = userPhone;
      //userInfo.userEmail = userEmail;
      userInfo.userEthnicity = userEthnicity;
      userInfo.userNationality = userNationality;
      userInfo.userBirthday = userBirthday;
      userInfo.userBirthplace = userBirthplace;
      userInfo.userContactAddress = userContactAddress;
      userInfo.userProvinceResidence = userProvinceResidence;
      userInfo.userDistrictResidence = userDistrictResidence;
      userInfo.userAddress12 = userAddress12;
      userInfo.userSchool12 = userSchool12;
      userInfo.userAddress11 = userAddress11;
      userInfo.userSchool11 = userSchool11;
      userInfo.userAddress10 = userAddress10;
      userInfo.userSchool10 = userSchool10;
      userInfo.userIdentityNumber = userIdentityNumber;
      userInfo.userWardResidence = userWardResidence;
      userInfo.userStreetResidence = userStreetResidence;

      await this.userService.editUserById(userId, userInfo);

      return {
        cvId: cvId,
        message: 'Đã lưu thành công !',
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeStateCv(userId: string) {
    // Find all cv have cvUserId is userId
    const listCv = await this.cvsRepo.find({ cvUserId: userId });

    // Update state of cv
    for (let i = 0; i < listCv.length; i++) {
      if (listCv[i].cvState === 'Đã lưu') {
        await this.cvsRepo.update(
          { cvId: listCv[i].cvId },
          { cvState: 'Đã nộp' },
        );
      }
    }

    return {
      message: 'Đã thay đổi trạng thái của CV thành công',
    };
  }

  async unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  async getCvByUserId(userId: string) {
    const listCV = await this.cvsRepo.find({ cvUserId: userId });
    return listCV;
  }

  async getListCVByUserId(userId: string): Promise<any[]> {
    let listcvs = await createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany(
        'cv.cvUserId',
        user,
        'user',
        'user.userId = cv.cvUserId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        cvapplyinformation,
        'cvai',
        'cvai.cvaiId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        aspiration,
        'aspiration',
        'aspiration.aspirationCvId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvMethodId',
        method,
        'method',
        'method.methodId = cv.cvMethodId',
      )
      .leftJoinAndMapMany(
        'aspiration.aspirationMajor',
        major,
        'major',
        'major.majorId = aspiration.aspirationMajor',
      )
      .leftJoinAndMapMany(
        'major.majorTypeProgram',
        typeProgram,
        'typeProgram',
        'typeProgram.typeProgramId = major.majorTypeProgram',
      )
      .orderBy('cv.cvId', 'ASC')
      .addOrderBy('aspiration.aspirationId', 'ASC')
      .select([
        // CV
        'cv.cvId',
        'cv.cvFile',

        // Method
        'method.methodName',

        // Aspiration
        'aspiration.aspirationId',
        'aspiration.aspirationState',

        // Major
        'major.majorName',
        'major.majorId',

        // TypeProgram
        'typeProgram.typeProgramName',
        'typeProgram.typeProgramId',
      ])
      .getRawMany();

    console.log(listcvs);

    const cvs = await this.cvsRepo
      .createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany(
        'cv.cvUserId',
        user,
        'user',
        'user.userId = cv.cvUserId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        cvapplyinformation,
        'cvai',
        'cvai.cvaiId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvMethodId',
        method,
        'method',
        'method.methodId = cv.cvMethodId',
      )
      .leftJoinAndMapMany(
        'method.methodTypeOfTrainingID',
        typeoftraining,
        'typeoftraining',
        'method.methodTypeOfTrainingID = typeoftraining.typeOfTrainingId',
      )
      .select([
        'cv.cvId',
        'cv.cvFile',
        'cv.cvState',
        'cv.cvStatusPay',
        'cv.cvComment',

        'method.methodName',
        'method.methodId',

        'typeoftraining.typeOfTrainingId',
        'typeoftraining.typeOfTrainingName',

        'user.userName',
        'user.userGender',
        // 'user.userPhone',
        // 'user.userEmail',
        'user.userEthnicity',
        'user.userNationality',
        'user.userBirthday',
        'user.userBirthplace',
        'user.userContactAddress',
        'user.userProvinceResidence',
        'user.userDistrictResidence',
        'user.userAddress12',
        'user.userSchool12',
        'user.userAddress11',
        'user.userSchool11',
        'user.userAddress10',
        'user.userSchool10',
        'user.userStreetResidence',
        'user.userWardResidence',

        'cvai.cvaiGraduateUniversity',
        'cvai.cvaiUniversityGPA',
        'cvai.cvaiUniversityGraduateYear',
        'cvai.cvaiGraduateCollege',
        'cvai.cvaiCollegeGPA',
        'cvai.cvaiCollegeGraduateYear',
        'cvai.cvaiPriorityArea',
        'cvai.cvaiGPA12',
        'cvai.cvaiGPA11',
        'cvai.cvaiGPA10',
        'cvai.cvaiHighSchoolGraduateYear',
        'cvai.cvaiCapacity12',
        'cvai.cvaiConduct12',
        'cvai.cvaiCapacity11',
        'cvai.cvaiConduct11',
        'cvai.cvaiCapacity10',
        'cvai.cvaiConduct10',
        'cvai.cvaiProvincialExcellentSubject',
        'cvai.cvaiProvincialExcellentYear',
        'cvai.cvaiProvincialExcellentAward',
        'cvai.cvaiIeltsCertificateScore',
        'cvai.cvaiIeltsCertificateExpiration',
        'cvai.cvaiToeflCertificateScore',
        'cvai.cvaiToeflCertificateExpiration',
        'cvai.cvaiHaveVietnameseCertificate',
        'cvai.cvaiVietnameseCertificateLevel',
        'cvai.cvaiPhone',
        'cvai.cvaiEmail',
      ])
      .getRawMany();

    //console.log(cvs)
    let result = cvs.map((cv) => {
      return {
        cvId: cv.cv_cvId,
        fileUrl: cv.cv_cvFile,
        cvState: cv.cv_cvState,
        cvStatusPay: cv.cv_cvStatusPay,
        cvComment: cv.cv_cvComment,

        method: {
          methodName: cv.method_methodName,
          methodId: cv.method_methodId,
        },

        typeOfTraining: {
          typeOfTrainingName: cv.typeoftraining_typeOfTrainingName,
          typeoftrainingId: cv.typeoftraining_typeOfTrainingId,
        },

        userName: cv.user_userName,
        userGender: cv.user_userGender,
        // userPhone: cv.user_userPhone,
        // userEmail: cv.user_userEmail,
        userEthnicity: cv.user_userEthnicity,
        userNationality: cv.user_userNationality,
        userBirthday: cv.user_userBirthday,
        userBirthplace: cv.user_userBirthplace,
        userContactAddress: cv.user_userContactAddress,
        userProvinceResidence: cv.user_userProvinceResidence,
        userDistrictResidence: cv.user_userDistrictResidence,
        userAddress12: cv.user_userAddress12,
        userSchool12: cv.user_userSchool12,
        userAddress11: cv.user_userAddress11,
        userSchool11: cv.user_userSchool11,
        userAddress10: cv.user_userAddress10,
        userStreetResidence: cv.user_userStreetResidence,
        userWardResidence: cv.user_userWardResidence,

        cvaiGraduateUniversity: cv.cvai_cvaiGraduateUniversity,
        cvaiUniversityGPA: cv.cvai_cvaiUniversityGPA,
        cvaiUniversityGraduateYear: cv.cvai_cvaiUniversityGraduateYear,
        cvaiGraduateCollege: cv.cvai_cvaiGraduateCollege,
        cvaiCollegeGPA: cv.cvai_cvaiCollegeGPA,
        cvaiCollegeGraduateYear: cv.cvai_cvaiCollegeGraduateYear,
        cvaiPriorityArea: cv.cvai_cvaiPriorityArea,
        cvaiGPA12: cv.cvai_cvaiGPA12,
        cvaiGPA11: cv.cvai_cvaiGPA11,
        cvaiGPA10: cv.cvai_cvaiGPA10,
        cvaiHighSchoolGraduateYear: cv.cvai_cvaiHighSchoolGraduateYear,
        cvaiCapacity12: cv.cvai_cvaiCapacity12,
        cvaiConduct12: cv.cvai_cvaiConduct12,
        cvaiCapacity11: cv.cvai_cvaiCapacity11,
        cvaiConduct11: cv.cvai_cvaiConduct11,
        cvaiCapacity10: cv.cvai_cvaiCapacity10,
        cvaiConduct10: cv.cvai_cvaiConduct10,
        cvaiProvincialExcellentSubject: cv.cvai_cvaiProvincialExcellentSubject,
        cvaiProvincialExcellentYear: cv.cvai_cvaiProvincialExcellentYear,
        cvaiProvincialExcellentAward: cv.cvai_cvaiProvincialExcellentAward,
        cvaiIeltsCertificateScore: cv.cvai_cvaiIeltsCertificateScore,
        cvaiIeltsCertificateExpiration: cv.cvai_cvaiIeltsCertificateExpiration,
        cvaiToeflCertificateScore: cv.cvai_cvaiToeflCertificateScore,
        cvaiToeflCertificateExpiration: cv.cvai_cvaiToeflCertificateExpiration,
        cvaiHaveVietnameseCertificate: cv.cvai_cvaiHaveVietnameseCertificate,
        cvaiVietnameseCertificateLevel: cv.cvai_cvaiVietnameseCertificateLevel,
        cvaiPhone: cv.cvai_cvaiPhone,
        cvaiEmail: cv.cvai_cvaiEmail,

        listAspiration: [],
      };
    });

    result.map((cvId, index) => {
      listcvs.forEach((cv) => {
        if (cv.cv_cvId === cvId.cvId) {
          result[index].listAspiration.push({
            aspirationId: cv.aspiration_aspirationId,
            aspirationState: cv.aspiration_aspirationState,
            typeProgram: {
              typeProgramName: cv.typeProgram_typeProgramName,
              typeProgramId: cv.typeProgram_typeProgramId,
            },
            major: {
              majorName: cv.major_majorName,
              majorId: cv.major_majorId,
            },
          });
        }
      });
    });

    return result;
  }

  async getCVInformation(cvId: number) {
    let listAspiration = await createQueryBuilder('cv')
      .where('cv.cvId = :cvId', { cvId: cvId })
      .leftJoinAndMapMany(
        'cv.cvUserId',
        user,
        'user',
        'user.userId = cv.cvUserId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        cvapplyinformation,
        'cvai',
        'cvai.cvaiId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        aspiration,
        'aspiration',
        'aspiration.aspirationCvId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvMethodId',
        method,
        'method',
        'method.methodId = cv.cvMethodId',
      )
      .leftJoinAndMapMany(
        'aspiration.aspirationMajor',
        major,
        'major',
        'major.majorId = aspiration.aspirationMajor',
      )
      .leftJoinAndMapMany(
        'major.majorTypeProgram',
        typeProgram,
        'typeProgram',
        'typeProgram.typeProgramId = major.majorTypeProgram',
      )
      .select([
        'cv.cvId',
        'method.methodName',
        'aspiration.aspirationId',
        'aspiration.aspirationState',
        'major.majorName',
        'typeProgram.typeProgramName',
        'cv.cvFile',
        'cv.cvState',
      ])
      .getRawMany();
    //console.log(cv)

    const cvs = await this.cvsRepo
      .createQueryBuilder('cv')
      .where('cv.cvId = :cvId', { cvId: cvId })
      .leftJoinAndMapMany(
        'cv.cvUserId',
        user,
        'user',
        'user.userId = cv.cvUserId',
      )
      .leftJoinAndMapMany(
        'cv.cvId',
        cvapplyinformation,
        'cvai',
        'cvai.cvaiId = cv.cvId',
      )
      .leftJoinAndMapMany(
        'cv.cvMethodId',
        method,
        'method',
        'method.methodId = cv.cvMethodId',
      )
      .select([
        'cv.cvId',
        'method.methodName',
        'cv.cvFile',
        'cv.cvState',

        'user.userName',
        'user.userGender',
        'user.userPhone',
        'user.userEmail',
        'user.userEthnicity',
        'user.userNationality',
        'user.userBirthday',
        'user.userBirthplace',
        'user.userContactAddress',
        'user.userProvinceResidence',
        'user.userDistrictResidence',
        'user.userAddress12',
        'user.userSchool12',
        'user.userAddress11',
        'user.userSchool11',
        'user.userAddress10',
        'user.userSchool10',

        'cvai.cvaiGraduateUniversity',
        'cvai.cvaiUniversityGPA',
        'cvai.cvaiUniversityGraduateYear',
        'cvai.cvaiGraduateCollege',
        'cvai.cvaiCollegeGPA',
        'cvai.cvaiCollegeGraduateYear',
        'cvai.cvaiPriorityArea',
        'cvai.cvaiGPA12',
        'cvai.cvaiGPA11',
        'cvai.cvaiGPA10',
        'cvai.cvaiHighSchoolGraduateYear',
        'cvai.cvaiCapacity12',
        'cvai.cvaiConduct12',
        'cvai.cvaiCapacity11',
        'cvai.cvaiConduct11',
        'cvai.cvaiCapacity10',
        'cvai.cvaiConduct10',
        'cvai.cvaiProvincialExcellentSubject',
        'cvai.cvaiProvincialExcellentYear',
        'cvai.cvaiProvincialExcellentAward',
        'cvai.cvaiIeltsCertificateScore',
        'cvai.cvaiIeltsCertificateExpiration',
        'cvai.cvaiToeflCertificateScore',
        'cvai.cvaiToeflCertificateExpiration',
        'cvai.cvaiHaveVietnameseCertificate',
        'cvai.cvaiVietnameseCertificateLevel',
      ])
      .getRawMany();

    //console.log(cvs)
    let result = cvs.map((cv) => {
      return {
        cvId: cv.cv_cvId,
        method: cv.method_methodName,
        fileUrl: cv.cv_cvFile,
        cvState: cv.cv_cvState,

        userName: cv.user_userName,
        userGender: cv.user_userGender,
        userPhone: cv.user_userPhone,
        userEmail: cv.user_userEmail,
        userEthnicity: cv.user_userEthnicity,
        userNationality: cv.user_userNationality,
        userBirthday: cv.user_userBirthday,
        userBirthplace: cv.user_userBirthplace,
        userContactAddress: cv.user_userContactAddress,
        userProvinceResidence: cv.user_userProvinceResidence,
        userDistrictResidence: cv.user_userDistrictResidence,
        userAddress12: cv.user_userAddress12,
        userSchool12: cv.user_userSchool12,
        userAddress11: cv.user_userAddress11,
        userSchool11: cv.user_userSchool11,
        userAddress10: cv.user_userAddress10,

        cvaiGraduateUniversity: cv.cvai_cvaiGraduateUniversity,
        cvaiUniversityGPA: cv.cvai_cvaiUniversityGPA,
        cvaiUniversityGraduateYear: cv.cvai_cvaiUniversityGraduateYear,
        cvaiGraduateCollege: cv.cvai_cvaiGraduateCollege,
        cvaiCollegeGPA: cv.cvai_cvaiCollegeGPA,
        cvaiCollegeGraduateYear: cv.cvai_cvaiCollegeGraduateYear,
        cvaiPriorityArea: cv.cvai_cvaiPriorityArea,
        cvaiGPA12: cv.cvai_cvaiGPA12,
        cvaiGPA11: cv.cvai_cvaiGPA11,
        cvaiGPA10: cv.cvai_cvaiGPA10,
        cvaiHighSchoolGraduateYear: cv.cvai_cvaiHighSchoolGraduateYear,
        cvaiCapacity12: cv.cvai_cvaiCapacity12,
        cvaiConduct12: cv.cvai_cvaiConduct12,
        cvaiCapacity11: cv.cvai_cvaiCapacity11,
        cvaiConduct11: cv.cvai_cvaiConduct11,
        cvaiCapacity10: cv.cvai_cvaiCapacity10,
        cvaiConduct10: cv.cvai_cvaiConduct10,
        cvaiProvincialExcellentSubject: cv.cvai_cvaiProvincialExcellentSubject,
        cvaiProvincialExcellentYear: cv.cvai_cvaiProvincialExcellentYear,
        cvaiProvincialExcellentAward: cv.cvai_cvaiProvincialExcellentAward,
        cvaiIeltsCertificateScore: cv.cvai_cvaiIeltsCertificateScore,
        cvaiIeltsCertificateExpiration: cv.cvai_cvaiIeltsCertificateExpiration,
        cvaiToeflCertificateScore: cv.cvai_cvaiToeflCertificateScore,
        cvaiToeflCertificateExpiration: cv.cvai_cvaiToeflCertificateExpiration,
        cvaiHaveVietnameseCertificate: cv.cvai_cvaiHaveVietnameseCertificate,
        cvaiVietnameseCertificateLevel: cv.cvai_cvaiVietnameseCertificateLevel,

        listAspiration: [],
      };
    });

    result.map((cvId, index) => {
      listAspiration.forEach((cv) => {
        if (cv.cv_cvId === cvId.cvId) {
          result[index].listAspiration.push({
            aspirationId: cv.aspiration_aspirationId,
            typeProgram: cv.typeProgram_typeProgramName,
            aspirationState: cv.aspiration_aspirationState,
            major: cv.major_majorName,
          });
        }
      });
    });

    return result[0];
  }

  async getAllCVs(): Promise<any[]> {
    let listcvs = await this.cvsRepo.find({});
    let result = [];
    for (let i = 0; i < listcvs.length; i++) {
      let cv = await this.getCVInformation(listcvs[i].cvId);
      result.push(cv);
    }

    return result;
  }

  // Update
  async updateCv(updateCVData: UpdateCVDto, userId: string) {
    try {
      const {
        cvId,
        method,
        listAspiration,
        fileUrl,
        userName,
        userGender,
        //userPhone,
        //userEmail,
        userEthnicity,
        userNationality,
        userBirthday,
        userBirthplace,
        userContactAddress,
        userProvinceResidence,
        userDistrictResidence,
        userAddress12,
        userSchool12,
        userAddress11,
        userSchool11,
        userAddress10,
        userSchool10,
        userWardResidence,
        userStreetResidence,
        ...data
      } = updateCVData;

      // Find cv by cvId
      let cv = await this.findCV(cvId);

      cv.cvMethodId = method ? method : cv.cvMethodId;
      cv.cvFile = fileUrl ? fileUrl : cv.cvFile;

      // Update cv
      await this.cvsRepo.update({ cvId: cvId }, cv);

      // Update cv apply information
      const cvaiData = new UpdateCVAIDto();
      cvaiData.cvaiId = cvId;
      cvaiData.cvaiGraduateUniversity = data.cvaiGraduateUniversity;
      cvaiData.cvaiUniversityGPA = data.cvaiUniversityGPA;
      cvaiData.cvaiUniversityGraduateYear = data.cvaiUniversityGraduateYear;
      cvaiData.cvaiGraduateCollege = data.cvaiGraduateCollege;
      cvaiData.cvaiCollegeGPA = data.cvaiCollegeGPA;
      cvaiData.cvaiCollegeGraduateYear = data.cvaiCollegeGraduateYear;
      cvaiData.cvaiPriorityArea = data.cvaiPriorityArea;
      cvaiData.cvaiGPA12 = data.cvaiGPA12;
      cvaiData.cvaiGPA11 = data.cvaiGPA11;
      cvaiData.cvaiGPA10 = data.cvaiGPA10;
      cvaiData.cvaiHighSchoolGraduateYear = data.cvaiHighSchoolGraduateYear;
      cvaiData.cvaiCapacity12 = data.cvaiCapacity12;
      cvaiData.cvaiConduct12 = data.cvaiConduct12;
      cvaiData.cvaiCapacity11 = data.cvaiCapacity11;
      cvaiData.cvaiConduct11 = data.cvaiConduct11;
      cvaiData.cvaiCapacity10 = data.cvaiCapacity10;
      cvaiData.cvaiConduct10 = data.cvaiConduct10;
      cvaiData.cvaiProvincialExcellentSubject =
        data.cvaiProvincialExcellentSubject;
      cvaiData.cvaiProvincialExcellentYear = data.cvaiProvincialExcellentYear;
      cvaiData.cvaiProvincialExcellentAward = data.cvaiProvincialExcellentAward;
      cvaiData.cvaiIeltsCertificateScore = data.cvaiIeltsCertificateScore;
      cvaiData.cvaiIeltsCertificateExpiration =
        data.cvaiIeltsCertificateExpiration;
      cvaiData.cvaiToeflCertificateScore = data.cvaiToeflCertificateScore;
      cvaiData.cvaiToeflCertificateExpiration =
        data.cvaiToeflCertificateExpiration;
      cvaiData.cvaiHaveVietnameseCertificate =
        data.cvaiHaveVietnameseCertificate;
      cvaiData.cvaiVietnameseCertificateLevel =
        data.cvaiVietnameseCertificateLevel;
      cvaiData.cvaiEmail = data.cvaiEmail;
      cvaiData.cvaiPhone = data.cvaiPhone;

      await this.cvaiSerivce.updateApplyInformationCV(cvaiData);

      // Update information of user in database
      const userInfo = new EditUserDto();
      userInfo.userName = userName;
      userInfo.userGender = userGender;
      //userInfo.userPhone = userPhone;
      //userInfo.userEmail = userEmail;
      userInfo.userEthnicity = userEthnicity;
      userInfo.userNationality = userNationality;
      userInfo.userBirthday = userBirthday;
      userInfo.userBirthplace = userBirthplace;
      userInfo.userContactAddress = userContactAddress;
      userInfo.userProvinceResidence = userProvinceResidence;
      userInfo.userDistrictResidence = userDistrictResidence;
      userInfo.userAddress12 = userAddress12;
      userInfo.userSchool12 = userSchool12;
      userInfo.userAddress11 = userAddress11;
      userInfo.userSchool11 = userSchool11;
      userInfo.userAddress10 = userAddress10;
      userInfo.userSchool10 = userSchool10;
      userInfo.userWardResidence = userWardResidence;
      userInfo.userStreetResidence = userStreetResidence;

      await this.userService.editUserById(userId, userInfo);

      // Delete old list aspiration
      const oldListAspiration =
        await this.aspirationService.findAspirationByCVid(cvId);
      for (let i = 0; i < oldListAspiration.length; i++) {
        // Delete aspiration in aspiration database
        await this.aspirationService.deleteAspiration(
          oldListAspiration[i].aspirationId,
        );
      }

      // Insert list aspiration into aspiration database
      for (let i = 0; i < listAspiration.length; i++) {
        // Save aspiration into aspiration database
        await this.addAspiration(
          cvId,
          listAspiration[i].typeProgram,
          listAspiration[i].major,
        );
      }

      return {
        cvId: cvId,
        message: 'Đã cập nhật thành công !',
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCVsStatusByFile(listUpdateStatusCVDto: Array<UpdateStatusCVDto>) {
    try {
      for (let i = 0; i < listUpdateStatusCVDto.length; i++) {
        const { cvId, cvState, cvComment, cvStatusPay, listAspiration } =
          listUpdateStatusCVDto[i];

        // Find cv by cvId
        let cv = await this.findCV(cvId);
        //console.log("hello")
        cv.cvState = cvState;
        cv.cvComment = cvComment;
        cv.cvStatusPay = cvStatusPay;

        // Update cv
        await this.cvsRepo.update({ cvId: cvId }, cv);

        // Update list aspiration
        for (let i = 0; i < listAspiration.length; i++) {
          // Save aspiration into aspiration database
          let aspiration = new UpdateAspirationDto();
          aspiration.aspirationState = listAspiration[i].aspirationState;

          await this.aspirationService.updateAspiration(
            listAspiration[i].aspirationId,
            aspiration,
          );
        }
      }
      return {
        message: 'Đã cập nhật thành công !',
      };
    } catch (error) {
      throw new NotImplementedException('Something went wrong');
    }
  }

  async deleteCv(cvId: number) {
    try {
      // Find CV
      await this.findCV(cvId);

      // Find listAspiration
      const listAspiration = await createQueryBuilder('cv')
        .where('cv.cvId = :cvId', { cvId: cvId })
        .leftJoinAndMapMany(
          'cv.cvId',
          aspiration,
          'aspiration',
          'aspiration.aspirationCvId = cv.cvId',
        )
        .select(['cv.cvId', 'aspiration.aspirationId'])
        .getRawMany();

      // Delete list aspiration of cv
      for (let i = 0; i < listAspiration.length; i++) {
        // Delete aspiration of cv
        await this.aspirationService.deleteAspiration(
          listAspiration[i].aspiration_aspirationId,
        );
      }

      // Delete cvInformation
      await this.cvaiSerivce.deleteCvai(cvId);

      // Delete cv
      await this.cvsRepo.delete({ cvId: cvId });

      return {
        message: 'Đã xóa thành công !',
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkMethodInCV(cvUserId: string, cvMethodId: string) {
    // const listCV = await this.cvsRepo.find({
    //   where: {
    //     cvState: "Đã nộp",
    //     cvMethodId: cvMethodId
    //   },
    // })
    const listCV = await createQueryBuilder('cv')
      .where('cvState= :state', { state: 'Đã nộp' })
      .andWhere('cvState= :state', { state: 'Trúng tuyển' })
      .andWhere('cvState= :state', { state: 'Không trúng tuyển' })
      .andWhere('cv.cvMethodId = :method', { method: cvMethodId })
      .getRawMany();

    console.log('check metod', listCV);

    let isDuplicate = false;
    listCV.forEach((cv) => {
      if (cv.cv_cvUserId === cvUserId) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      throw new NotImplementedException(
        'Bạn đã ứng tuyển bằng phương thức này rồi',
      );
    }
  }

  async applyOneCV(cvId: number) {
    // Find cv
    const cv = await this.findCV(cvId);

    // Kiểm tra xem trong danh sách cv đã nộp có cv nào có method giống không
    await this.checkMethodInCV(cv.cvUserId, cv.cvMethodId);

    try {
      // Update state của cv
      cv.cvState = 'Đã nộp';
      let res = await this.cvsRepo.update({ cvId: cvId }, cv);

      if (res.affected > 0) {
        const detail = await createQueryBuilder('cv')
          .where('cv.cvId = :id', { id: cvId })
          .leftJoinAndMapMany(
            'cv.cvUserId',
            user,
            'user',
            'user.userId = cv.cvUserId',
          )
          .leftJoinAndMapMany(
            'cv.cvId',
            cvapplyinformation,
            'cvai',
            'cvai.cvaiId = cv.cvId',
          )
          .leftJoinAndMapMany(
            'cv.cvId',
            aspiration,
            'aspiration',
            'aspiration.aspirationCvId = cv.cvId',
          )
          .leftJoinAndMapMany(
            'aspiration.aspirationMajor',
            major,
            'major',
            'major.majorId = aspiration.aspirationMajor',
          )
          .leftJoinAndMapMany(
            'cv.cvMethodId',
            method,
            'method',
            'method.methodId = cv.cvMethodId',
          )
          // .leftJoinAndMapMany('method.methodTypeOfTrainingID', typeoftraining, 'typeoftraining', 'method.methodTypeOfTrainingID = typeoftraining.typeOfTrainingId')
          .select([
            'cv.cvId',
            'method.methodName',
            'cv.cvFile',
            'cv.cvState',

            'user.userName',
            'user.userGender',
            'user.userPhone',
            'user.userEmail',
            'user.userEthnicity',
            'user.userNationality',
            'user.userBirthday',
            'user.userBirthplace',
            'user.userContactAddress',
            'user.userProvinceResidence',
            'user.userDistrictResidence',
            'user.userAddress12',
            'user.userSchool12',
            'user.userAddress11',
            'user.userSchool11',
            'user.userAddress10',
            'user.userSchool10',

            'cvai.cvaiGraduateUniversity',
            'cvai.cvaiUniversityGPA',
            'cvai.cvaiUniversityGraduateYear',
            'cvai.cvaiGraduateCollege',
            'cvai.cvaiCollegeGPA',
            'cvai.cvaiCollegeGraduateYear',
            'cvai.cvaiPriorityArea',
            'cvai.cvaiGPA12',
            'cvai.cvaiGPA11',
            'cvai.cvaiGPA10',
            'cvai.cvaiHighSchoolGraduateYear',
            'cvai.cvaiCapacity12',
            'cvai.cvaiConduct12',
            'cvai.cvaiCapacity11',
            'cvai.cvaiConduct11',
            'cvai.cvaiCapacity10',
            'cvai.cvaiConduct10',
            'cvai.cvaiProvincialExcellentSubject',
            'cvai.cvaiProvincialExcellentYear',
            'cvai.cvaiProvincialExcellentAward',
            'cvai.cvaiIeltsCertificateScore',
            'cvai.cvaiIeltsCertificateExpiration',
            'cvai.cvaiToeflCertificateScore',
            'cvai.cvaiToeflCertificateExpiration',
            'cvai.cvaiHaveVietnameseCertificate',
            'cvai.cvaiVietnameseCertificateLevel',

            'major.majorName',
            'major.majorId',
          ])
          .getRawMany();

        console.log(
          'cvDetail',
          detail[0],
          'cvDetailcvDetailcvDetail',
          detail[0].cvaiUniversityGraduateYear,
        );
        let obj = {};
        if (cv.cvMethodId === 'DT' && detail.length > 0) {
          (obj['graduatedYear'] = detail[0]['cvai_cvaiUniversityGraduateYear']),
            (obj['gpa12'] = detail[0]['cvai_cvaiGPA12']),
            //   gpa12: "9",
            (obj['area'] = detail[0]['cvai_cvaiPriorityArea']),
            //   area: "1",
            (obj['class12'] = detail[0]['user_userSchool12']),
            //   class12: "Hung Vuong",
            (obj['province12'] = detail[0]['user_userAddress12']),
            //   province12: "Binh Thuan",
            (obj['district'] = detail[0]['user_userDistrictResidence']),
            //   district: "Binh Thuan",
            (obj['name'] = detail[0]['user_userName']),
            //   name: "Phung Quoc Luong Test",
            (obj['ethnic'] = detail[0]['user_userEthnicity']),
            //   ethnic: "Kinh",
            //   cmnd: "261508456",
            (obj['birthday'] = detail[0]['user_userEthnicity']),
            //   birthday: "25/03/2000",
            (obj['birthplace'] = detail[0]['user_userBirthplace']),
            //   birthplace: "Binh Thuan",
            (obj['address'] = detail[0]['user_userContactAddress']),
            //   address: "Tan Ha, Duc Linh, Binh Thuan",
            (obj['phone'] = detail[0]['user_userPhone']),
            //   phone: "0375006715",
            (obj['email'] = detail[0]['user_userEmail']),
            //   email: "quocluong2503@gmail.com",
            // obj['code'] = detail[0]['userEmail'],
            //   code: "abcdefgh",
            (obj['national'] = detail[0]['user_userNationality']),
            //   national: "Viet nam",
            (obj['province'] = detail[0]['user_userProvinceResidence']),
            //   province: "Binh Thuan"
            // }
            await this.pdfService.generatePdf(cvId, obj, 'DT');
        }
        if (cv.cvMethodId === 'XT' && detail.length > 0) {
          (obj['majorName'] = detail[0]['major_majorName']),
            (obj['userBirthday'] = detail[0]['user_userBirthday']),
            (obj['userGender'] = detail[0]['user_userGender']),
            (obj['cmnd'] = '00000000000000'),
            (obj['userAddress'] = detail[0]['user_userContactAddress']),
            (obj['cvaiPhone'] = detail[0]['user_userPhone']),
            (obj['cvaiEmail'] = detail[0]['user_userEmail']),
            (obj['cvaiGraduateUniversity'] =
              detail[0]['user_cvaiGraduateUniversity']),
            await this.pdfService.generatePdf(cvId, obj, 'XT');
        }

        if (cv.cvMethodId === '2A' && detail.length > 0) {
          (obj['userName'] = detail[0]['user_userName']),
            (obj['userBirthplace'] = detail[0]['user_userBirthplace']),
            (obj['userSchool10'] = detail[0]['user_userSchool10']),
            (obj['userSchool11'] = detail[0]['user_userSchool11']),
            (obj['userSchool12'] = detail[0]['user_userSchool12']),
            (obj['cvaiProvincialExcellentSubject'] =
              detail[0]['cvai_cvaiProvincialExcellentSubject']),
            (obj['cvaiProvincialExcellentYear'] =
              detail[0]['cvai_cvaiProvincialExcellentYear']),
            (obj['cvaiConduct10'] = detail[0]['cvai_cvaiConduct10']),
            (obj['cvaiConduct11'] = detail[0]['cvai_cvaiConduct11']),
            (obj['cvaiConduct12'] = detail[0]['cvai_cvaiConduct12']),
            (obj['cvaiPhone'] = detail[0]['cvai_cvaiPhone']),
            (obj['cvaiEmail'] = detail[0]['cvai_cvaiEmail']),
            await this.pdfService.generatePdf(cvId, obj, '2A');
        }

        if (cv.cvMethodId === '5.' && detail.length > 0) {
          (obj['userName'] = detail[0]['user_userName']),
            (obj['userBirthday'] = detail[0]['user_userBirthday']),
            (obj['userGender'] = detail[0]['user_userGender']),
            (obj['userBirthplace'] = detail[0]['user_userBirthplace']),
            (obj['userNationality'] = detail[0]['user_userNationality']),
            (obj['userContactAddress'] = detail[0]['user_userContactAddress']),
            (obj['userPhone'] = detail[0]['user_userPhone']),
            (obj['cvaiEmail'] = detail[0]['cvai_cvaiEmail']),
            (obj['userSchool10'] = detail[0]['user_userSchool10']),
            (obj['userSchool11'] = detail[0]['user_userSchool11']),
            (obj['userSchool12'] = detail[0]['user_userSchool12']),
            (obj['cvaiGPA10'] = detail[0]['cvai_cvaiGPA10']),
            (obj['cvaiGPA11'] = detail[0]['cvai_cvaiGPA11']),
            (obj['cvaiGPA12'] = detail[0]['cvai_cvaiGPA12']),
            (obj['cvaiIeltsCertificateScore'] =
              detail[0]['cvai_cvaiIeltsCertificateScore']),
            (obj['cvaiToeflCertificateScore'] =
              detail[0]['cvai_cvaiToeflCertificateScore']),
            (obj['cvaiVietnameseCertificateLevel'] =
              detail[0]['cvai_cvaiVietnameseCertificateLevel']),
            await this.pdfService.generatePdf(cvId, obj, '5.');
        }

        if (cv.cvMethodId === '6.' && detail.length > 0) {
          (obj['userName'] = detail[0]['user_userName']),
            (obj['userBirthday'] = detail[0]['user_userBirthday']),
            (obj['userGender'] = detail[0]['user_userGender']),
            (obj['userBirthplace'] = detail[0]['user_userBirthplace']),
            (obj['userNationality'] = detail[0]['user_userNationality']),
            (obj['userContactAddress'] = detail[0]['user_userContactAddress']),
            (obj['userPhone'] = detail[0]['user_userPhone']),
            (obj['cvaiEmail'] = detail[0]['cvai_cvaiEmail']),
            (obj['userSchool10'] = detail[0]['user_userSchool10']),
            (obj['userSchool11'] = detail[0]['user_userSchool11']),
            (obj['userSchool12'] = detail[0]['user_userSchool12']),
            (obj['cvaiGPA10'] = detail[0]['cvai_cvaiGPA10']),
            (obj['cvaiGPA11'] = detail[0]['cvai_cvaiGPA11']),
            (obj['cvaiGPA12'] = detail[0]['cvai_cvaiGPA12']),
            (obj['cvaiGPATotal'] = detail[0]['cvai_cvaiGPATotal']),
            (obj['cvaiIeltsCertificateScore'] =
              detail[0]['cvai_cvaiIeltsCertificateScore']),
            (obj['cvaiToeflCertificateScore'] =
              detail[0]['cvai_cvaiToeflCertificateScore']),
            (obj['cvaiVietnameseCertificateLevel'] =
              detail[0]['cvai_cvaiVietnameseCertificateLevel']),
            await this.pdfService.generatePdf(cvId, obj, '6.');
        }

        // Gửi mail báo đã nộp thành công
        const message =
          '<div ><div ><p ></p></div><p>Chào bạn,</p><p>Chúc mừng bạn đã thành công nộp hồ sơ với mã <b>' + cvId +'</b> vào trường Đại học Khoa học Tự Nhiên.<p>Bạn vui lòng theo dõi thông tin tại app hoặc website của trường và kiểm tra email thường xuyên để cập nhật kết quả sớm nhất</p></p></p><p>Trân trọng,</p><p>Phòng công tác sinh viên</p>Trường Đại học Khoa học Tự nhiên</div>';
        await this.mailService.notifyUser(
          detail[0]['user_userEmail'],
          'THÔNG BÁO ĐÃ NỘP HỒ SƠ THÀNH CÔNG',
          message,
        );

        // Gửi thông báo
        await this.notifyService.sendToDirectDevice(
          "Thông báo đã nộp hồ sơ thành công",
          "THÔNG BÁO ĐÃ NỘP HỒ SƠ THÀNH CÔNG",
          "cv",
          cv.cvId,
          cv.cvUserId
        )

        return {
          message: 'Đã cập nhật trạng thái của cv thành công!',
          cvId: cvId,
          detail: detail,
        };
      }
    } catch (error) {
      throw new NotFoundException(
        'Không thể cập nhật trạng thái đã nộp của cv có mã ' + cvId,
      );
    }
  }

  async updateStatusCV(updateStatusCVDto: UpdateStatusCVDto) {
    try {
      const { cvId, cvState, cvComment, cvStatusPay, listAspiration } =
        updateStatusCVDto;

      // Find cv by cvId
      let cv = await this.findCV(cvId);
      //console.log("hello")
      cv.cvState = cvState;
      cv.cvComment = cvComment;
      cv.cvStatusPay = cvStatusPay;

      // Update cv
      await this.cvsRepo.update({ cvId: cvId }, cv);

      // Update list aspiration
      let majorId;
      for (let i = 0; i < listAspiration.length; i++) {
        // Save aspiration into aspiration database
        let aspiration = new UpdateAspirationDto();
        aspiration.aspirationState = listAspiration[i].aspirationState;

        const aspirationUpdated = await this.aspirationService.updateAspiration(
          listAspiration[i].aspirationId,
          aspiration,
        );

        if (listAspiration[i].aspirationState === 'Trúng tuyển') {
          majorId = aspirationUpdated.aspirationMajor;
        }
      }

      // Tìm tên major
      const majorName = await (
        await this.majorService.getSingleMajor(majorId)
      ).majorName;

      if (cvState === 'Trúng tuyển') {
        // Gửi mail báo trúng tuyển
        const content =
          'Chúc mừng bạn đã trúng tuyển vào ngành <b>' +
          majorName +
          '</b> của Trường Đại học Khoa học Tự nhiên' +
          '</p></p></p>Mã hồ sơ của bạn là <b>' + cv.cvId + '</b></p>'
          
        const cvai = await this.cvaiSerivce.findCvai(cv.cvId);
        const message =
          '<div ><div ><p ></p></div><p>Chào bạn,</p><p>' +
          content +
          '</p></p><p>Trân trọng,</p><p>Phòng công tác sinh viên</p>Trường Đại học Khoa học Tự nhiên</div>';
        await this.mailService.notifyUser(
          cvai.cvaiEmail,
          'THÔNG BÁO TRÚNG TUYỂN',
          message,
        );

        // Gửi thông báo
        await this.notifyService.sendToDirectDevice(
          "Chúc mừng bạn đã trúng tuyển",
          'THÔNG BÁO TRÚNG TUYỂN',
          'cv',
          cv.cvId,
          cv.cvUserId
        )
      }

      return {
        message: 'Đã cập nhật thành công !',
      };
    } catch (error) {
      throw new NotImplementedException('Something went wrong');
    }
  }

  private async findCV(cvId: number): Promise<cv> {
    let cv;
    try {
      cv = await this.cvsRepo.findOne({ cvId: cvId });
    } catch (error) {
      throw new NotFoundException('Could not find CV ' + cvId);
    }

    if (!cv) {
      throw new NotFoundException('Could not find CV ' + cvId);
    }

    return cv;
  }
}
