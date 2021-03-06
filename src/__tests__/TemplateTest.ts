import Template from '../Template'

describe('Template', (): void => {
  it('can render readme', async (): Promise<void> => {
    const text = await Template.readme('to play music', { useCache: true })
    expect(text).toMatchSnapshot()
  })
})
