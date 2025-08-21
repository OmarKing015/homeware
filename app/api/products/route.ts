import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import { Product } from '@/sanity.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    
    // Validate required parameters
    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    // Validate category values
    if (!['lingerie', 'pajamas'].includes(category.toLowerCase())) {
      return NextResponse.json(
        { error: 'Category must be either "lingerie" or "pajamas"' },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters. Page must be >= 1, limit must be 1-50' },
        { status: 400 }
      );
    }

    // Fetch products using the existing function
    const allProducts: Product[] = await getProductsByCategory(category.toLowerCase());
    
    if (!allProducts) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    // Calculate pagination
    const totalCount = allProducts.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Get paginated products
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    // Return paginated response
    return NextResponse.json({
      products: paginatedProducts,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method if you need to create products via API
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'POST method not implemented for this endpoint' },
    { status: 405 }
  );
}

// Optional: Handle unsupported methods
export async function PUT() {
  return NextResponse.json(
    { error: 'PUT method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'DELETE method not allowed' },
    { status: 405 }
  );
}