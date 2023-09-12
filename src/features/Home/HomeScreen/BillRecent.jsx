import { Box, Typography } from '@mui/material';
import React from 'react';
import { memo } from 'react';
import convertToVND from 'utils/ConvertToVND';
import { v4 as uuidv4 } from 'uuid';
const BillRecent = ({ recentTransactions }) => {
    return (
        <Box>
            <Box sx={{ borderBottom: "3px solid gray", margin: "1rem", pb: "1rem" }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"

                >
                    Giao dịch gần đây
                </Typography>
            </Box>

            {recentTransactions.length > 0 ? recentTransactions.map(transaction => (
                <Box
                    key={transaction.username}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="2px solid gray"
                    m="15px"
                    pb="1rem"
                >
                    <Box>
                        <Typography

                            variant="h5"
                            fontWeight="600"
                        >
                            {uuidv4().substr(0, 4) + transaction.id}
                        </Typography>
                        <Typography >
                            {transaction.username}
                        </Typography>
                    </Box>
                    <Box >{transaction.create_at}</Box>
                    <Box

                        p="5px 10px"
                        borderRadius="4px"
                    >
                        {convertToVND(transaction.total_price)}
                    </Box>
                </Box>
            )) : <Typography>Không có giao dịch nào gần đây</Typography>

            }
        </Box>
    );
};

export default memo(BillRecent);