export default (baseUrl: string) =>
  [
    {
      name: 'value',
      description: 'required. value to inspect. can be any javascript value',
      defaultValue: undefined,
    },
    {
      name: 'name',
      description: 'name of outer value. displayed as key',
      defaultValue: undefined,
    },
    {
      name: 'stringCollapse',
      description:
        'set a max display length for string values. 0 means full string will be displayed',
      defaultValue: 0,
    },
    {
      name: 'showLength',
      description:
        'display length of arrays or strings and number of nested entries in objects / maps etc',
      defaultValue: true,
    },
    {
      name: 'showTypes',
      description:
        'display type labels before values e.g. "string" / "number." Mainly affects basic primitive types',
      defaultValue: true,
    },
    {
      name: 'showPreview',
      description: 'display preview of nested values of object, array, map, set etc.',
      defaultValue: true,
    },
    {
      name: 'showTools',
      description: `display row of utility-"tools" when hovering an entry`,
      defaultValue: true,
    },
    {
      name: 'noanimate',
      description: 'disable animations / transitions',
      defaultValue: false,
    },
    {
      name: 'embedMedia',
      description:
        'embed images and audio if a string value is a path or url that ends with an image or audio file extension',
      defaultValue: false,
    },
    {
      name: 'theme',
      description: 'color theme class',
      defaultValue: 'drak',
      alternatives: [
        'drak',
        'stereo',
        'dark',
        'light',
        'cotton-candy',
        '<insert your own theme class here>',
      ],
      link: `${baseUrl}/theming`,
    },
    {
      name: 'expandAll',
      description: 'expand all nodes by default. can be a performance hitch with a lot of entries',
      defaultValue: false,
    },
    {
      name: 'expandLevel',
      description: 'default level of initially expanded nested nodes',
      defaultValue: 1,
    },
    {
      name: 'borderless',
      description: 'remove background color, border and padding',
      defaultValue: false,
    },
    {
      name: 'quotes',
      description: " quote type for string values.'single'or'double'",
      alternatives: ['single', 'double'],
      defaultValue: 'single',
    },
    {
      name: 'customComponents',
      description: 'custom components for values. see link for extended documentation and demo',
      defaultValue: '{}',
      link: `${baseUrl}/custom`,
    },
  ] as const
