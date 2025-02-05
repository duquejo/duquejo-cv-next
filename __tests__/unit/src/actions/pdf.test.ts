import * as pdfMeModule from '@pdfme/generator';
import { generatePdf } from '@/actions/pdf';

vi.mock('next-intl/server', () => ({
  getTranslations: () => {
    const translations: Record<string, unknown> = {
      introduction: 'introduction',
      databases: 'databases',
      cicd: 'cicd',
      backend: 'backend',
      programming_languages: 'programming_languages',
      frontend: 'frontend',
      cloud: 'cloud',
      security: 'security',
      architecture: 'architecture',
      methodologies: 'methodologies',
      experience: 'experience',
      languages: [],
    };
    const t = (key: string) => translations[key];
    t.raw = (key: string) => translations[key];
    return t;
  },
}));

describe('PDF action', () => {
  it('should work as expected', async () => {
    const generateSpy = vi.spyOn(pdfMeModule, 'generate');

    await generatePdf();

    expect(generateSpy).toHaveBeenCalledWith({
      inputs: expect.any(Array),
      template: expect.any(Object),
    });
  });
});
