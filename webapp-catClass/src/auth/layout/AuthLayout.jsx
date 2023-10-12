import { Box, Grid, Typography } from '@mui/material'

export const AuthLayout = ({children, title = ''}) => {
  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgcolor="primary.main"
    >
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundSize: 'cover' }}
          >
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}
          sx={{
            mx: "auto",
            width: {md: 450},
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <Box py={3} px={3} textAlign="center">
              <Box mb={1} textAlign="center">
                <Typography variant="h4" fontWeight="bold" >
                  { title }
                </Typography>
              </Box>
            </Box>
            <Box p={3}>{ children }</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    // <Grid container
    //   spacing={0}
    //   direction='column'
    //   alignItems='center'
    //   justifyContent='center'
    //   sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    // >
    //   <Grid item
    //     className='box-shadow'
    //     xs={3}
    //     sx={{
    //       width: {md: 450},
    //       backgroundColor: 'white',
    //       padding: 3,
    //       borderRadius: 2
    //     }}
    //   >
    //     <Typography variant='h5' sx={{mb: 1}}>{ title }</Typography>
    //     { children }
    //   </Grid>
    // </Grid>
  )
}