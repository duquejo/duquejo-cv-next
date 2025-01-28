import { generate } from '@pdfme/generator';
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

vi.mock('@pdfme/generator', () => ({
  generate: vi.fn(() => new Promise<Buffer>((resolve) => resolve(Buffer.from('PDF content')))),
}));

describe('PDF action', () => {
  it('should work as expected', async () => {
    await generatePdf();

    expect(generate).toHaveBeenCalledWith({
      inputs: expect.any(Array),
      template: expect.any(Object),
    });
  });
});
