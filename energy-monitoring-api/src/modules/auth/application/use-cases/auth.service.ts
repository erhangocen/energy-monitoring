import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { UserRepository } from 'src/modules/user/domain/interfaces/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { CurrentUserDto } from '../dtos/current-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload: CurrentUserDto = {
      sub: user.id,
      role: user.role,
      orgId: user.organizationId,
      userId: user.id,
      userName: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const existing = await this.userRepo.findByEmail(createUserDto.email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }

    if (
      createUserDto.role !== 'admin' &&
      createUserDto.organizationId === undefined
    ) {
      throw new BadRequestException(
        'Organization ID is required for non-admin users',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new User(
      createUserDto.name,
      createUserDto.email,
      hashedPassword,
      createUserDto.role,
      createUserDto.organizationId ?? null,
    );

    const created = await this.userRepo.create(user);

    const payload: CurrentUserDto = {
      sub: created.id,
      role: created.role,
      orgId: created.organizationId,
      userId: created.id,
      userName: created.name,
      email: created.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async deleteUser(id: string) {
    await this.userRepo.delete(id);
  }
}
