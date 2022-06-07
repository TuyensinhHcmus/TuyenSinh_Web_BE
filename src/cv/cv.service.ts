import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(cv)
    private readonly cvsRepo: Repository<cv>,
    private readonly aspirationService: AspirationService,
    private readonly cvaiSerivce: CvaisService,
    private readonly userService: UsersService,
  ) { }

  async addCv(cvMethodId: string, cvUserId: string, cvFile: string): Promise<cv> {
    const cv = await this.cvsRepo.create({
      cvMethodId: cvMethodId,
      cvUserId: cvUserId,
      cvFile: cvFile,
      cvDateCreate: new Date(),
      cvState: "Đã lưu",
    })

    const result = await this.cvsRepo.save(cv);

    return result;
  }

  async addAspiration(CvId: number, typeProgram: string, major: string) {
    const aspirationData = new AddAspirationDto();
    aspirationData.aspirationCvId = CvId;
    aspirationData.aspirationMajor = major;
    aspirationData.aspirationState = "";

    await this.aspirationService.insertAspiration(aspirationData);
  }

  async insertCv(addCVDto: AddCVDto, userId: string) {
    try {
      const { method, listAspiration, fileUrl,
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
        // userWardResidence,
        // userStreetResidence,
        ...data } = addCVDto;
      // Save cv into cv database
      const { cvId } = await this.addCv(method, userId, fileUrl);

      for (let i = 0; i < listAspiration.length; i++) {

        // Save aspiration into aspiration database
        await this.addAspiration(cvId, listAspiration[i].typeProgram, listAspiration[i].major);
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
      cvaiData.cvaiProvincialExcellentSubject = data.cvaiProvincialExcellentSubject;
      cvaiData.cvaiProvincialExcellentYear = data.cvaiProvincialExcellentYear;
      cvaiData.cvaiProvincialExcellentAward = data.cvaiProvincialExcellentAward;
      cvaiData.cvaiIeltsCertificateScore = data.cvaiIeltsCertificateScore;
      cvaiData.cvaiIeltsCertificateExpiration = data.cvaiIeltsCertificateExpiration;
      cvaiData.cvaiToeflCertificateScore = data.cvaiToeflCertificateScore;
      cvaiData.cvaiToeflCertificateExpiration = data.cvaiToeflCertificateExpiration;
      cvaiData.cvaiHaveVietnameseCertificate = data.cvaiHaveVietnameseCertificate;
      cvaiData.cvaiVietnameseCertificateLevel = data.cvaiVietnameseCertificateLevel;
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
      // userInfo.userWardResidence = userWardResidence;
      // userInfo.userStreetResidence = userStreetResidence;

      await this.userService.editUserById(userId, userInfo);

      return {
        cvId: cvId,
        message: "Đã lưu thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeStateCv(userId: string) {
    // Find all cv have cvUserId is userId
    const listCv = await this.cvsRepo.find({ cvUserId: userId });

    // Update state of cv
    for (let i = 0; i < listCv.length; i++) {
      if (listCv[i].cvState === "Đã lưu") {
        await this.cvsRepo.update({ cvId: listCv[i].cvId }, { cvState: "Đã nộp" })
      }
    }

    return {
      message: "Đã thay đổi trạng thái của CV thành công"
    };
  }

  async unique(arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  async getCvByUserId(userId: string) {
    const listCV = await this.cvsRepo.find({ cvUserId: userId });
    return listCV;
  }

  async getListCVByUserId(userId: string): Promise<any[]> {
    let listcvs = await createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany('cv.cvUserId', user, 'user', 'user.userId = cv.cvUserId')
      .leftJoinAndMapMany('cv.cvId', cvapplyinformation, 'cvai', 'cvai.cvaiId = cv.cvId')
      .leftJoinAndMapMany('cv.cvId', aspiration, 'aspiration', 'aspiration.aspirationCvId = cv.cvId')
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
      .leftJoinAndMapMany('aspiration.aspirationMajor', major, 'major', 'major.majorId = aspiration.aspirationMajor')
      .leftJoinAndMapMany('major.majorTypeProgram', typeProgram, 'typeProgram', 'typeProgram.typeProgramId = major.majorTypeProgram')
      .select([
        'cv.cvId',
        'method.methodName',
        'aspiration.aspirationId',
        'major.majorName',
        'major.majorId',
        'typeProgram.typeProgramName',
        'typeProgram.typeProgramId',
        'cv.cvFile',

      ])
      .getRawMany();

    const cvs = await this.cvsRepo.createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany('cv.cvUserId', user, 'user', 'user.userId = cv.cvUserId')
      .leftJoinAndMapMany('cv.cvId', cvapplyinformation, 'cvai', 'cvai.cvaiId = cv.cvId')
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
      .leftJoinAndMapMany('method.methodTypeOfTrainingID', typeoftraining, 'typeoftraining', 'method.methodTypeOfTrainingID = typeoftraining.typeOfTrainingId')
      .select([
        'cv.cvId',
        'cv.cvFile',
        'cv.cvState',
        
        'method.methodName',
        'method.methodId',

        'typeoftraining.typeOfTrainingId',
        'typeoftraining.typeOfTrainingName',
        

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
        'cvai.cvaiVietnameseCertificateLevel'
      ])
      .getRawMany()

    //console.log(cvs)
    let result = cvs.map(cv => {
      return {
        cvId: cv.cv_cvId,
        fileUrl: cv.cv_cvFile,
        cvState: cv.cv_cvState,
        method: {
          methodName: cv.method_methodName,
          methodId: cv.method_methodId
        },

        typeOfTraining: {
          typeOfTrainingName: cv.typeoftraining_typeOfTrainingName,
          typeoftrainingId: cv.typeoftraining_typeOfTrainingId
        },


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

        listAspiration: []
      }
    })

    result.map((cvId, index) => {
      listcvs.forEach(cv => {
        if (cv.cv_cvId === cvId.cvId) {
          result[index].listAspiration.push({
            aspirationId: cv.aspiration_aspirationId,
            typeProgram: {
              typeProgramName: cv.typeProgram_typeProgramName,
              typeProgramId: cv.typeProgram_typeProgramId
            },
            major: {
              majorName: cv.major_majorName,
              majorId: cv.major_majorId,
            }
          })
        }
      })
    })

    return result;
  }

  async getCVInformation(cvId: number) {
    let listAspiration = await createQueryBuilder('cv')
      .where('cv.cvId = :cvId', { cvId: cvId })
      .leftJoinAndMapMany('cv.cvUserId', user, 'user', 'user.userId = cv.cvUserId')
      .leftJoinAndMapMany('cv.cvId', cvapplyinformation, 'cvai', 'cvai.cvaiId = cv.cvId')
      .leftJoinAndMapMany('cv.cvId', aspiration, 'aspiration', 'aspiration.aspirationCvId = cv.cvId')
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
      .leftJoinAndMapMany('aspiration.aspirationMajor', major, 'major', 'major.majorId = aspiration.aspirationMajor')
      .leftJoinAndMapMany('major.majorTypeProgram', typeProgram, 'typeProgram', 'typeProgram.typeProgramId = major.majorTypeProgram')
      .select([
        'cv.cvId',
        'method.methodName',
        'aspiration.aspirationId',
        'aspiration.aspirationState',
        'major.majorName',
        'typeProgram.typeProgramName',
        'cv.cvFile',
        'cv.cvState'

      ])
      .getRawMany();
    //console.log(cv)

    const cvs = await this.cvsRepo.createQueryBuilder('cv')
      .where('cv.cvId = :cvId', { cvId: cvId })
      .leftJoinAndMapMany('cv.cvUserId', user, 'user', 'user.userId = cv.cvUserId')
      .leftJoinAndMapMany('cv.cvId', cvapplyinformation, 'cvai', 'cvai.cvaiId = cv.cvId')
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
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
        'cvai.cvaiVietnameseCertificateLevel'
      ])
      .getRawMany()

    //console.log(cvs)
    let result = cvs.map(cv => {
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

        listAspiration: []
      }
    })

    result.map((cvId, index) => {
      listAspiration.forEach(cv => {
        if (cv.cv_cvId === cvId.cvId) {
          result[index].listAspiration.push({
            aspirationId: cv.aspiration_aspirationId,
            typeProgram: cv.typeProgram_typeProgramName,
            aspirationState: cv.aspiration_aspirationState,
            major: cv.major_majorName
          })
        }
      })
    })

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
      const { cvId, method, listAspiration, fileUrl,
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
        ...data } = updateCVData;

      // Find cv by cvId
      let cv = await this.cvsRepo.findOne({ cvId: cvId });

      cv.cvMethodId = method;
      cv.cvFile = fileUrl;

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
      cvaiData.cvaiProvincialExcellentSubject = data.cvaiProvincialExcellentSubject;
      cvaiData.cvaiProvincialExcellentYear = data.cvaiProvincialExcellentYear;
      cvaiData.cvaiProvincialExcellentAward = data.cvaiProvincialExcellentAward;
      cvaiData.cvaiIeltsCertificateScore = data.cvaiIeltsCertificateScore;
      cvaiData.cvaiIeltsCertificateExpiration = data.cvaiIeltsCertificateExpiration;
      cvaiData.cvaiToeflCertificateScore = data.cvaiToeflCertificateScore;
      cvaiData.cvaiToeflCertificateExpiration = data.cvaiToeflCertificateExpiration;
      cvaiData.cvaiHaveVietnameseCertificate = data.cvaiHaveVietnameseCertificate;
      cvaiData.cvaiVietnameseCertificateLevel = data.cvaiVietnameseCertificateLevel;

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

      await this.userService.editUserById(userId, userInfo);

      // Update list aspiration
      for (let i = 0; i < listAspiration.length; i++) {

        // Save aspiration into aspiration database
        let aspiration = new UpdateAspirationDto();
        aspiration.aspirationMajor = listAspiration[i].major;
        aspiration.aspirationCvId = cvId;
        aspiration.aspirationState = "";

        let updateAspiration = await this.aspirationService.updateAspiration(listAspiration[i].aspirationId, aspiration);
      }

      return {
        cvId: cvId,
        message: "Đã cập nhật thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCVsStatusByFile(listUpdateStatusCVDto: Array<UpdateStatusCVDto>) {
    try {
      for (let i = 0; i < listUpdateStatusCVDto.length; i++) {
        const { cvId, cvState, listAspiration } = listUpdateStatusCVDto[i];

        // Find cv by cvId
        let cv = await this.cvsRepo.findOne({ cvId: cvId });

        cv.cvState = cvState;

        // Update cv
        await this.cvsRepo.update({ cvId: cvId }, cv);

        // Update list aspiration
        for (let i = 0; i < listAspiration.length; i++) {

          // Save aspiration into aspiration database
          let aspiration = new UpdateAspirationDto();
          aspiration.aspirationState = listAspiration[i].aspirationState;

          await this.aspirationService.updateAspiration(listAspiration[i].aspirationId, aspiration);
        }
      }
      return {
        message: "Đã cập nhật thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCv(cvId: number) {
    try {
      // Find CV
      await this.findCV(cvId);

      // Find listAspiration
      const listAspiration = await createQueryBuilder('cv')
        .where('cv.cvId = :cvId', { cvId: cvId })
        .leftJoinAndMapMany('cv.cvId', aspiration, 'aspiration', 'aspiration.aspirationCvId = cv.cvId')
        .select([
          'cv.cvId',
          'aspiration.aspirationId',
        ])
        .getRawMany();


      // Delete list aspiration of cv 
      for (let i = 0; i < listAspiration.length; i++) {
        // Delete aspiration of cv 
        await this.aspirationService.deleteAspiration(listAspiration[i].aspiration_aspirationId);
      }

      // Delete cvInformation
      await this.cvaiSerivce.deleteCvai(cvId);

      // Delete cv
      await this.cvsRepo.delete({ cvId: cvId });


      return {
        message: "Đã xóa thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   async deleteContact(contactId: string): Promise<void> {
  //     try {
  //       await this.contactsRepo.delete({contactId: parseInt(contactId)})
  //     } catch (err) {
  //       throw new NotFoundException('Could not delete contact.', err);
  //     }
  //   }

  //   async getSingleContact(contactId: string): Promise<contact> {
  //     const contact = await this.findContact(contactId);
  //     return contact;
  //   }

  //   async updateContact(id: string, updateContactDto: UpdateContactDto): Promise<contact> {

  //     const { department, room, address, phone, email, page } = updateContactDto;

  //     const contact = await this.findContact(id);

  //     contact.contactDepartment = department;
  //     contact.contactRoom = room;
  //     contact.contactAddress = address;
  //     contact.contactPhone = phone;
  //     contact.contactEmail = email;
  //     contact.contactPage = page;

  //     await this.contactsRepo.update({contactId: parseInt(id)}, contact);

  //     return contact;
  //   }

  private async findCV(cvId: number): Promise<cv> {
    let cv;

    try {
      cv = await this.cvsRepo.findOne({ cvId: cvId });
    } catch (error) {
      throw new NotFoundException('Could not find CV.');
    }

    if (!cv) {
      throw new NotFoundException('Could not find CV');
    }

    return cv;
  }
}
