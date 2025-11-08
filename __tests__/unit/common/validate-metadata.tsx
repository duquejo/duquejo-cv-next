import type { MetadataTypes } from '@/interfaces';
import { createMetadata } from '@/lib';
import type { Metadata } from 'next';

/**
 * Helper function to create metadata validation tests.
 * Note: The @/lib module must be mocked in the test file before importing this helper.
 *
 * @example
 * ```ts
 * vi.mock('@/lib', async (importOriginal) => ({
 *   ...(await importOriginal()),
 *   createMetadata: vi.fn(),
 * }));
 *
 * import validateMetadata from '../../../../common/validate-metadata';
 * import { generateMetadata } from '@/app/[lang]/page';
 *
 * validateMetadata(generateMetadata, 'General');
 * ```
 */
export default function validateMetadata(
  metadataFn: () => Promise<Metadata>,
  translateContext: MetadataTypes,
) {
  describe(`generateMetadata ${translateContext} tests`, () => {
    it(`should generate metadata for the ${translateContext} page`, async () => {
      const mockedMetadata = {
        title: `${translateContext} - Mocked Title`,
        description: `${translateContext} - Mocked Description`,
      } satisfies Metadata;

      vi.mocked(createMetadata).mockResolvedValueOnce(mockedMetadata);

      const result = await metadataFn();

      expect(createMetadata).toHaveBeenCalledWith(translateContext);
      expect(result).toEqual(mockedMetadata);
    });
  });
}
