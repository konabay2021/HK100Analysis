
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
export default function LargeTextPaperSkeleton() {
    return (
        <div style={{ marginTop: '15px' }}>
            <Skeleton width={'60%'} height={30} style={{ marginBottom: '15px' }} />
            <Skeleton width={'60%'} height={30} style={{ marginBottom: '15px' }} />
            <Skeleton width={'60%'} height={30} style={{ marginBottom: '15px' }} />
            <Skeleton width={'60%'} height={30} style={{ marginBottom: '15px' }} />
            <Skeleton width={'60%'} height={30} style={{ marginBottom: '15px' }} />
            <Skeleton width={'40%'} height={30} style={{ marginBottom: '15px' }} />
        </div>
    )
}
