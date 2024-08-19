'use client'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({page, pageCount, onChange, hideNextButton, hidePrevButton}: {page: number; pageCount: number; hideNextButton: boolean; hidePrevButton: boolean ; onChange: (event: React.ChangeEvent<unknown>, page: number) => void}) {
  return (
    <Stack spacing={2}>
      <Pagination page={page} hideNextButton={hideNextButton} hidePrevButton={hidePrevButton} count={pageCount} onChange={onChange} />
    </Stack>
  );
}