import test, { expect } from '@playwright/test';
import { getInitialsFromUserClaims } from '../../src/components/utils/userClaims';

test.describe('getInitialsFromUserClaims behavior', async () => {
  test(`given givenName and familyName, the initials will be returned`, async () => {
    const result = getInitialsFromUserClaims({
      givenName: 'Robert',
      familyName: 'Krones',
    });
    expect(result).toBe('RK');
  });

  test(`given givenName and (or) familyName are lowercase, the initials will be returned uppercased`, async () => {
    const result = getInitialsFromUserClaims({
      givenName: 'robert',
      familyName: 'Krones',
    });
    expect(result).toBe('RK');
  });

  test(`given only givenName is present, it should return null`, async () => {
    const result = getInitialsFromUserClaims({ givenName: 'robert' });
    expect(result).toBe(null);
  });

  test(`given the name (3 words total) is present (contains spaces between words) and either givenName or familyName is absent, it should return the initials of the first and last name`, async () => {
    const result = getInitialsFromUserClaims({
      name: 'Robert William Krones-World',
    });
    expect(result).toBe('RK');
  });

  test(`given the name (2 words total) is present (contains spaces between words) and either givenName or familyName is absent, it should return the initials of the first and last name`, async () => {
    const result = getInitialsFromUserClaims({
      name: 'Robert William',
    });
    expect(result).toBe('RW');
  });

  test(`given the name is present (doesn't include spaces) and either givenName or familyName is absent, it should return the first 2 letters of that name`, async () => {
    const result = getInitialsFromUserClaims({
      name: 'robert.krones@krones.com',
    });
    expect(result).toBe('RO');
  });

  test(`given the name should be used and it includes prohibited characters, it should be sanitized and the initials of the first and last name should be returned`, async () => {
    const result = getInitialsFromUserClaims({
      name: 'Árpád (Kálmán)',
    });
    expect(result).toBe('ÁK');
  });

  test(`given givenName and familyName and them including prohibited characters, they should be sanitized and the initials should be returned`, async () => {
    const result = getInitialsFromUserClaims({
      givenName: '$Á$rpád',
      familyName: '[Kálmán]',
    });
    expect(result).toBe('ÁK');
  });
});
