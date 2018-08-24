export const login = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'verification.Login',
          }
        }
      ],
      options: {
        topBar: {
          background: {
            color: 'rgb(58, 61, 80)'
          },
          transparent: true,
        },
        layout: {
          backgroundColor: 'rgb(58, 61, 80)'
        }
      }
    }
  }
}

export const app = {
  root: {
    bottomTabs: {
      children: [
        {
          component: {
            name: '',
          },
        },
        {
          component: {
            name: '',
          },
        },
      ],
    }
  }
}